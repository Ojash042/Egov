from django.contrib.auth import authenticate, login, logout
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import render, redirect
from django.views.decorators.csrf import ensure_csrf_cookie, requires_csrf_token, csrf_exempt
from rest_framework.response import Response
from rest_framework.views import APIView

from rojgar.models import User, JobPosting
from rojgar.serializers import UserSerializer


# Create your views here.

def index(request):
    return render(request, "rojgar/Index.html")

@requires_csrf_token
@ensure_csrf_cookie
def sign_up_get(request):
    return render(request, "rojgar/SignUp.html")


class RegistrationView(APIView):
    def post(self, request):
        data = request.data
        del data["confirmPassword"]
        data_body = {
            "user_first_name": data["firstName"],
            "user_last_name": data["lastName"],
            "user_email": data["email"],
            "user_file_location": "",
            "user_contact_info": data["phone"],
            "password": data["password"]
        }
        try:
            User.objects.get(user_email=data_body["user_email"])
            context = {
                "error": "E-mail already exists"
            }

            return Response(context, status=400)
        except ObjectDoesNotExist:
            serializer = UserSerializer(data=data_body)
            if serializer.is_valid():
                serializer.save()
                return redirect("/")
            else:
                print(serializer.errors)


@ensure_csrf_cookie
@requires_csrf_token
def login_get(request):
    if request.user.is_authenticated:
        return redirect("/")
    return render(request, "rojgar/Login.html")


class LoginPost(APIView):
    def post(self, request):
        if request.user.is_authenticated:
            return redirect("/")
        data = request.data
        user = authenticate(request, user_email=data["email"], password=data["password"])
        if user is not None:
            login(request, user)
            return redirect("/")
        else:
            context = {
                "error": "Invalid Credentials"
            }
            return Response(context, status=400)


class LogoutView(APIView):
    def get(self, request):
        logout(request)
        return redirect("/")


def create_a_job(request):
    if not request.user.is_authenticated :
        return redirect("/Login")
    else:
        user = User.objects.get(pk=request.user.id)
        if not user.user_represents_company:
            return redirect("/")
        return render(request, "rojgar/CreateAJob.html")


class CreateAJobPost(APIView):
    def post(self, request):
        data = request.data
        user = request.user
        employer = user.Employer
        job_post = JobPosting(job_posting_name=data["jobName"], job_posting_salary=(data["minimumSalary"]+" - "+data["maximumSalary"]), job_posting_details=data["jobDetails"], Employer=employer)
        job_post.save()
        return redirect("/")


def job_listings(request):
    if not request.user.is_authenticated:
        return redirect("rojgar:Login")
    return render(request, "rojgar/JobListing.html")


class JobDetails(APIView):
    def get(self, request, job_id):
        return render(request, "rojgar/JobDetails.html")
