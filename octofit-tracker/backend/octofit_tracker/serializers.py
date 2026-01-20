from rest_framework import serializers
from .models import User, Team, Activity, Leaderboard, Workout


class UserSerializer(serializers.ModelSerializer):
    _id = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['_id', 'username', 'email', 'password', 'team', 'created_at']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    def get__id(self, obj):
        return str(obj._id) if obj._id else None
    
    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        return user


class TeamSerializer(serializers.ModelSerializer):
    _id = serializers.SerializerMethodField()
    
    class Meta:
        model = Team
        fields = ['_id', 'name', 'description', 'members', 'created_at']
    
    def get__id(self, obj):
        return str(obj._id) if obj._id else None


class ActivitySerializer(serializers.ModelSerializer):
    _id = serializers.SerializerMethodField()
    
    class Meta:
        model = Activity
        fields = ['_id', 'user_id', 'activity_type', 'duration', 'distance', 'calories', 'date', 'notes']
    
    def get__id(self, obj):
        return str(obj._id) if obj._id else None


class LeaderboardSerializer(serializers.ModelSerializer):
    _id = serializers.SerializerMethodField()
    
    class Meta:
        model = Leaderboard
        fields = ['_id', 'user_id', 'username', 'team', 'total_activities', 'total_duration', 'total_calories', 'rank']
    
    def get__id(self, obj):
        return str(obj._id) if obj._id else None


class WorkoutSerializer(serializers.ModelSerializer):
    _id = serializers.SerializerMethodField()
    
    class Meta:
        model = Workout
        fields = ['_id', 'name', 'description', 'activity_type', 'duration', 'difficulty', 'calories_estimate']
    
    def get__id(self, obj):
        return str(obj._id) if obj._id else None
