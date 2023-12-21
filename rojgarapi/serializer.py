from rest_framework import serializers
from rojgar.models import *


class EmployerSerializer(serializers.ModelSerializer):
    employerId = serializers.IntegerField(source="id", read_only=True)
    employerName = serializers.CharField(source="employer_name", read_only=True)
    employerProvince = serializers.CharField(source="employer_province", read_only=True)
    employerLocation = serializers.CharField(source="employer_location", read_only=True)
    employerDetails = serializers.CharField(source="employer_details", read_only=True)

    class Meta:
        model = Employer
        fields = ("employerId", "employerName", "employerProvince", "employerLocation", "employerDetails")


class JobListSerializer(serializers.ModelSerializer):
    jobId = serializers.IntegerField(source="id", read_only=True)
    jobPostName = serializers.CharField(source="job_posting_name", read_only=True)
    jobDetails = serializers.CharField(source="job_posting_details", read_only=True)
    salaryRange = serializers.CharField(source="job_posting_salary", read_only=True)
    employer = EmployerSerializer(source="Employer")

    class Meta:
        model = JobPosting
        fields = ("jobId", "jobPostName", "salaryRange", "jobDetails", "employer")
