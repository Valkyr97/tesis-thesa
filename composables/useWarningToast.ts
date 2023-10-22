import { useToast, POSITION } from 'vue-toastification'
import UiWarningToast from '~/components/ui/WarningToast.vue'

export default function () {
  const toast = useToast()
  const isLoading = useLoading()

  const warningToast = (
    action: string,
    options: { text?: string; onConfirm: () => void }
  ) => {
    isLoading.value = true

    const { onConfirm, text } = options

    if (!text) {
      toast.error(
        `Ha ocurrido un error, no se encuentra el elemento que desea ${action}`
      )
      return
    }

    toast.error(
      {
        component: UiWarningToast,
        props: {
          elementToDelete: `${options.text}`,
          onConfirm,
          textToConfirm: action.charAt(0).toUpperCase() + action.slice(1),
        },
      },
      {
        position: POSITION.TOP_CENTER,
        timeout: false,
        draggable: false,
        closeOnClick: false,
        icon: false,
        closeButton: false,
        onClose: () => (isLoading.value = false),
      }
    )
  }

  return {
    warningToast,
  }
}
