from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from . import serializer
from rojgar.models import *
from .serializer import JobListSerializer


class JobListAPI(APIView):

    authentication_classes = []
    permission_classes = (AllowAny,)

    def get(self, request):
        queryset = JobPosting.objects.all()
        serializer = JobListSerializer(queryset, many=True)
        return Response(serializer.data)


class JobDetailsAPI(APIView):
    authentication_classes = []
    permission_classes = (AllowAny,)

    def get(self, request, job_id):
        queryset = JobPosting.objects.get(pk=int(job_id))
        serializer = JobListSerializer(queryset, many=False)
        return Response(serializer.data)


class ApplyToJob(APIView):
    def get(self, request, job_id):
        queryset = JobPosting.objects.get(pk=int(job_id))
        user = User.objects.get(pk=request.user.id)
        if user in queryset.Users_Applied:
            return Response(status=400)
        queryset.Users_Applied.add(user)
        return Response(status=200)
