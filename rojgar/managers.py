from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import gettext_lazy as _


class CustomUserManager(BaseUserManager):
    def create_user(self, user_email, password, **extra_fields):
        if not user_email:
            raise ValueError(_("The e-mail is not set"))
        user_email = self.normalize_email(user_email)
        user = self.model(user_email=user_email, **extra_fields)
        user.set_password(password)
        extra_fields.setdefault("is_active", True)
        user.save()
        return user

    def create_superuser(self, user_email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError(_("Superuser must have value is_staff set to true"))
        if extra_fields.get("is_superuser") is not True:
            raise ValueError(_("Superuser must have value is_superuser set to True"))
        return self.create_user(user_email, password, **extra_fields)