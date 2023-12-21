from django.urls import path
from .views import *

app_name = "rojgarapi"

urlpatterns = [
    path("JobList/", JobListAPI.as_view(), name="JobList"),
    path("JobDetails/<str:job_id>", JobDetailsAPI.as_view(), name="JobDetails"),
    path("ApplyToJobs/<str:job_id>", ApplyToJob.as_view(), name="ApplyToJob"),
]
