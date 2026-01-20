from django.contrib import admin
from .models import User, Team, Activity, Leaderboard, Workout


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'team', 'created_at']
    list_filter = ['team', 'created_at']
    search_fields = ['username', 'email']
    ordering = ['-created_at']


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ['name', 'description', 'created_at']
    search_fields = ['name', 'description']
    ordering = ['name']


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ['user_id', 'activity_type', 'duration', 'distance', 'calories', 'date']
    list_filter = ['activity_type', 'date']
    search_fields = ['user_id', 'activity_type', 'notes']
    ordering = ['-date']


@admin.register(Leaderboard)
class LeaderboardAdmin(admin.ModelAdmin):
    list_display = ['rank', 'username', 'team', 'total_activities', 'total_duration', 'total_calories']
    list_filter = ['team']
    search_fields = ['username', 'user_id']
    ordering = ['rank']


@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ['name', 'activity_type', 'duration', 'difficulty', 'calories_estimate']
    list_filter = ['difficulty', 'activity_type']
    search_fields = ['name', 'description']
    ordering = ['name']
