from django.urls import path
from .views import *

app_name = "rojgar"

urlpatterns = [
    path("", index, name="Index"),
    path("SignUp/", sign_up_get, name="SignUp"),
    path("register/", RegistrationView.as_view(), name="RegisterPost"),
    path("Login/", login_get, name="Login"),
    path("LoginPost/", LoginPost.as_view(), name="LoginPost"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("CreateAJob/", create_a_job, name="CreateAJob"),
    path("CreateJobPost/", CreateAJobPost.as_view(), name="CreateJobPost"),
    path("JobListings/", job_listings, name="JobListings"),
    path("JobDetails/<str:job_id>", JobDetails.as_view(), name="JobDetails"),
]
