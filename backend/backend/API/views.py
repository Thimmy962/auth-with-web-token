from rest_framework import response, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, AllowAny
from base.models import Note, User
from .serializers import NoteSerializer, UserRegistrationSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username.title()
        # ...

        return token
    

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        'api/token',
        'api/token/refresh',

    ]
    return response.Response(routes)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def Notes(request):
    try:
        user = request.user
    except User.DoesNotExist:
        return response.Response(status=status.HTTP_404_NOT_FOUND)
    #note_set is the default related name when no related name is provided
    if request.method == 'GET':
        notes = user.note_set.all()
        serializer = NoteSerializer(notes, many=True)
        return response.Response(serializer.data)
    else:
        note = Note(request.data)
        note.owner = user
        serializer = NoteSerializer(data=note)
        if serializer.is_valid(raise_exception=True):
            note.save()
            return response.Response(status=status.HTTP_201_CREATED)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

@api_view(['POST'])
@permission_classes([AllowAny])
def registerUser(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        try:
            user = serializer.create(request.data)
            if user:
                return response.Response(serializer.data, status=status.HTTP_201_CREATED)
        except: return response.Response({"username":["Username exist"]}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def getNote(request, pk):
    try:
        note = Note.objects.get(pk = pk)
    except Note.DoesNotExist:
        return response.Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = NoteSerializer(note)
        return response.Response(serializer.data)

    elif request.method == 'PUT':
        serializer = NoteSerializer(note, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return response.Response(serializer.data)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        note.delete()
        return response.Response(status=status.HTTP_204_NO_CONTENT)