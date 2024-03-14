# from django.shortcuts import render
# from rest_framework.authentication import SessionAuthentication
# from django.contrib.auth import get_user_model, login, logout
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer
# from rest_framework import permissions, status

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.http import JsonResponse


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username # additional encrpyted token for username

        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    
@api_view(["GET"])
def get_routes(request):
    routes = [
        "user_api/token",
        "user_api/token/refresh/",
    ]
    
    return Response(routes)



# class UserRegister(APIView):
#     permission_classes = (permissions.AllowAny,)
#     authentication_classes = (SessionAuthentication, )
#     def post(self, request):
#         serializer = UserRegisterSerializer(data=clean_data)
#         if serializer.is_valid():
#             user = serializer.create(clean_data)
#             if user:
#                 return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(status=status.HTTP_400_BAD_REQUEST)
    
    
# class UserLogin(APIView):
#     permission_classes = (permissions.AllowAny,)
#     authentication_classes = (SessionAuthentication, )
#     def post(self, request):
#         data = request.data
#         serializer = UserLoginSerializer(data)
#         if serializer.is_valid():
#             user = serializer.check_user(data)
#             login(request, user)
#             return Response(serializer.data, status=status.HTTP_200_OK)
        
# class UserLogout(APIView):
#     def post(self, request):
#         logout(request)
#         return Response(status=status.HTTP_200_OK)
    
# class UserView(APIView):
#     permission_classes = (permissions.IsAuthenticated, )
#     authentication_classes = (SessionAuthentication, )
#     def get(self, request):
#         serializer = UserSerializer(request.user)
#         return Response({"user": serializer.data}, status=status.HTTP_200_OK)