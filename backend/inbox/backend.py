from users.models import User
from django.shortcuts import get_object_or_404
from django.forms.models import model_to_dict
from .models import InboxEntry

def get_inbox(user_id, id=0):
    user = User.objects.get(pk=user_id)

    if id != 0:
        return InboxEntry.objects.get(pk=id, user=user)

    ibox_entry = InboxEntry.objects.filter(user=user)
    ibox_list = []

    for i in ibox_entry:
        user_from = User.objects.get(pk=i.userFrom_id)
        i = model_to_dict(i)
        i["userFrom"] = model_to_dict(user_from)
        ibox_list.append(i)

    return ibox_list
