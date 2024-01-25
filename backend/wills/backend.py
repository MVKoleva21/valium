from django.shortcuts import get_object_or_404
from users.models import User
from notifications.models import Notification
from wallets.models import Wallet
from .models import Will
from inbox.models import InboxEntry
from django.forms.models import model_to_dict
from datetime import datetime
from celery import Celery, shared_task
from celery.schedules import crontab
import uuid

app = Celery("wills-check")

app.conf.beat_schedule = {
    "date_check": {
        "task": "wills-check.date_check",
        "schedule": crontab(hour=0, minute=0),
    },
}

@app.task
def date_check():
    wills_to_check = Will.objects.all()

    for i in wills_to_check:
        if i.active:
            if i.transferData == datetime.now().strftime("%Y-%m-%d"):
                owner = User.objects.get(pk=i.owner_id)
                inheritor = User.objects.get(pk=i.inheritor_id)

                owner.wallet.bgn -= float(will.amounts.bgn)
                owner.wallet.eur -= float(will.amounts.eur)
                owner.wallet.btc -= float(will.amounts.btc)
                owner.wallet.etc -= float(will.amounts.etc)

                owner.wallet.save()

                inheritor.wallet.bgn += float(will.amounts.bgn)
                inheritor.wallet.eur += float(will.amounts.eur)
                inheritor.wallet.btc += float(will.amounts.btc)
                inheritor.wallet.etc += float(will.amounts.etc)

                inheritor.wallet.save()

                will.active = False

                will.save()

                InboxEntry.objects.create(
                        user=inheritor,
                        message=i.message,
                        title=i.title
                    )

                Notification.objects.create(
                        user=inheritor,
                        message=f"You have new will from {owner.email}. Check your inbox."
                    )

def update_will(data, user, id):
    try:
        inheritor = User.objects.get(email=data["inheritor"])
    except:
        raise Exception("User does not exist")


    owner = User.objects.get(pk=user.id)

    will = Will.objects.get(owner=owner, pk=id) 

    will.amounts.bgn = float(data["amounts"]["bgn"])
    will.amounts.eur = float(data["amounts"]["eur"])
    will.amounts.btc = float(data["amounts"]["btc"])
    will.amounts.etc = float(data["amounts"]["etc"])

    will.message = data["message"]
    will.transferDate = str(data["transferDate"])
    will.effectiveImmediate = data["effectiveImmediate"]
    will.title = data["title"]

    will.save()

    if data["effectiveImmediate"]:
        owner.wallet.bgn -= float(will.amounts.bgn)
        owner.wallet.eur -= float(will.amounts.eur)
        owner.wallet.btc -= float(will.amounts.btc)
        owner.wallet.etc -= float(will.amounts.etc)

        owner.wallet.save()

        inheritor.wallet.bgn += float(will.amounts.bgn)
        inheritor.wallet.eur += float(will.amounts.eur)
        inheritor.wallet.btc += float(will.amounts.btc)
        inheritor.wallet.etc += float(will.amounts.etc)

        inheritor.wallet.save()

        will.active = False

        will.save()

        InboxEntry.objects.create(
                user=inheritor,
                message=will.message,
                title=will.title
            )

        Notification.objects.create(
                user=inheritor,
                message=f"You have new will from {owner.email}. Check your inbox."
            )

    return will

def add_new_will(data, user):
    try:
        inheritor = User.objects.get(email=data["transferTo"])
    except:
        raise Exception("User does not exist")


    owner = User.objects.get(pk=user.id)

    wallet = Wallet.objects.create(
                bgn=data["amount"]["bgn"],
                eur=data["amount"]["eur"],
                btc=data["amount"]["btc"],
                etc=data["amount"]["etc"]
            )


    will = Will.objects.create(
            message=data["message"],
            amounts=wallet,
            inheritor=inheritor, 
            transferDate=str(data["transferDate"]),
            owner=owner,
            effectiveImmediate=data["effectiveImmediate"],
            title=data["title"],
            willNumber=uuid.uuid1()
        )

    if data["effectiveImmediate"]:
        owner.wallet.bgn -= float(will.amounts.bgn)
        owner.wallet.eur -= float(will.amounts.eur)
        owner.wallet.btc -= float(will.amounts.btc)
        owner.wallet.etc -= float(will.amounts.etc)

        owner.wallet.save()

        inheritor.wallet.bgn += float(will.amounts.bgn)
        inheritor.wallet.eur += float(will.amounts.eur)
        inheritor.wallet.btc += float(will.amounts.btc)
        inheritor.wallet.etc += float(will.amounts.etc)

        inheritor.wallet.save()

        will.active = False

        will.save()

        InboxEntry.objects.create(
                user=inheritor,
                message=will.message,
                title=will.title
            )

        Notification.objects.create(
                user=inheritor,
                message=f"You have new will from {owner.email}. Check your inbox."
            )

    return will

def get_wills(user):
    user = User.objects.get(pk=user.id)
    wills = Will.objects.filter(owner=user) 
    will_list = []

    for i in wills:
        inheritor = User.objects.get(pk=i.inheritor_id)
        will_dict = model_to_dict(i)
        will_dict["inheritor"] = inheritor.email
        will_dict["timestamp"] = i.timestamp
        will_dict["amounts"] = model_to_dict(Wallet.objects.get(pk=i.amounts_id))

        will_list.append(will_dict)

    return will_list

def get_will(user, id):
    user = User.objects.get(pk=user.id)
    will = Will.objects.get(owner=user, pk=id) 

    return will

def delete_will(user, id):
    user = User.objects.get(pk=user.id)
    will = Will.objects.get(owner=user, pk=id) 

    will.delete()
        
    return will

