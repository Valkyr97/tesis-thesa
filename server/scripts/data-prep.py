import json
import sys
import os

def first_function():
    json_data = open(sys.argv[2])
    data = json.load(json_data)
    with open(f'{os.getcwd()}/server/scripts/outfile.json', 'w') as outfile:
        json_obj_result = json.dumps(data, indent=4)
        outfile.write(json_obj_result)

    print('ok')


if sys.argv[1] == 'first_function':
    first_function()

sys.stdout.flush()