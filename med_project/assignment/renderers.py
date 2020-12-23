import json
from rest_framework.renderers import JSONRenderer


def get(obj, key):
    if obj is None:
        return None
    return obj[key]


class AssignmentJSONRenderer(JSONRenderer):
    charset = 'utf-8'

    def render(self, data, accepted_media_type, renderer_context):
        try:
            for d in data['assignments']:
                d["specification"] = get(d["specification"], "name")
                d["creator"] = get(d["creator"], 'email')
                d["user"] = get(d["user"], 'email')
                tag = get(d["tag"], 'name')

                d["tag"] = "without tag" if tag == None else tag

        except:
            return json.dumps({'detail': "Invalid data from server"})
        return json.dumps(data)
