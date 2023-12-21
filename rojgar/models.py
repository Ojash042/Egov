from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from Employment import settings
from .managers import CustomUserManager


class User(AbstractBaseUser, PermissionsMixin):
    user_email = models.EmailField(_("email address"), unique=True)
    user_contact_info = models.CharField(max_length=15)
    user_first_name = models.CharField(max_length=200)
    user_last_name = models.CharField(max_length=200)
    user_file_location = models.CharField(max_length=200, blank=True)
    user_represents_company = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = "user_email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return f"{self.user_first_name} {self.user_last_name}"


class Employer(models.Model):
    STATES = (
        ('Pradesh 1', "Pradesh 1"),
        ("Madhesh", "Madhesh"),
        ("Bagmati", "Bagmati"),
        ("Gandaki", "Gandaki"),
        ("Lumbini", "Lumbini"),
        ("Karnali", "Karnali"),
        ("Sudur Paschim", "Sudur Paschim")
    )

    employer_name = models.CharField(max_length=200)
    employer_province = models.CharField(max_length=20, choices=STATES, default="Bagmati")
    employer_location = models.CharField(max_length=200)
    employer_details = models.TextField()
    User = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="Employer")

    def __str__(self):
        return f"{self.employer_name}"


class JobPosting(models.Model):
    job_posting_name = models.CharField(max_length=200)
    job_posting_salary = models.CharField(max_length=200)
    job_posting_details = models.TextField()
    Employer = models.ForeignKey(Employer, on_delete=models.CASCADE)
    Users_Applied = models.ManyToManyField(settings.AUTH_USER_MODEL, null=True)

    def __str__(self):
        return f"{self.job_posting_name}"
