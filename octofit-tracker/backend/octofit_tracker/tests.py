from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from .models import User, Team, Activity, Leaderboard, Workout
from datetime import datetime


class UserModelTest(TestCase):
    """Test cases for User model"""
    
    def setUp(self):
        self.user = User.objects.create(
            username='Test Hero',
            email='test@hero.com',
            password='test_password',
            team='Test Team'
        )
    
    def test_user_creation(self):
        """Test that user can be created successfully"""
        self.assertEqual(self.user.username, 'Test Hero')
        self.assertEqual(self.user.email, 'test@hero.com')
        self.assertEqual(self.user.team, 'Test Team')
    
    def test_user_str(self):
        """Test the string representation of user"""
        self.assertEqual(str(self.user), 'Test Hero')


class TeamModelTest(TestCase):
    """Test cases for Team model"""
    
    def setUp(self):
        self.team = Team.objects.create(
            name='Test Team',
            description='A test team for heroes',
            members=['user1', 'user2']
        )
    
    def test_team_creation(self):
        """Test that team can be created successfully"""
        self.assertEqual(self.team.name, 'Test Team')
        self.assertEqual(len(self.team.members), 2)
    
    def test_team_str(self):
        """Test the string representation of team"""
        self.assertEqual(str(self.team), 'Test Team')


class ActivityModelTest(TestCase):
    """Test cases for Activity model"""
    
    def setUp(self):
        self.activity = Activity.objects.create(
            user_id='test_user_id',
            activity_type='Running',
            duration=30,
            distance=5.0,
            calories=300,
            date=datetime.now(),
            notes='Morning run'
        )
    
    def test_activity_creation(self):
        """Test that activity can be created successfully"""
        self.assertEqual(self.activity.activity_type, 'Running')
        self.assertEqual(self.activity.duration, 30)
        self.assertEqual(self.activity.calories, 300)


class LeaderboardModelTest(TestCase):
    """Test cases for Leaderboard model"""
    
    def setUp(self):
        self.leaderboard = Leaderboard.objects.create(
            user_id='test_user_id',
            username='Test Hero',
            team='Test Team',
            total_activities=10,
            total_duration=300,
            total_calories=3000,
            rank=1
        )
    
    def test_leaderboard_creation(self):
        """Test that leaderboard entry can be created successfully"""
        self.assertEqual(self.leaderboard.username, 'Test Hero')
        self.assertEqual(self.leaderboard.rank, 1)
        self.assertEqual(self.leaderboard.total_activities, 10)


class WorkoutModelTest(TestCase):
    """Test cases for Workout model"""
    
    def setUp(self):
        self.workout = Workout.objects.create(
            name='Test Workout',
            description='A test workout routine',
            activity_type='Cardio',
            duration=45,
            difficulty='Intermediate',
            calories_estimate=500
        )
    
    def test_workout_creation(self):
        """Test that workout can be created successfully"""
        self.assertEqual(self.workout.name, 'Test Workout')
        self.assertEqual(self.workout.difficulty, 'Intermediate')
        self.assertEqual(self.workout.calories_estimate, 500)


class UserAPITest(APITestCase):
    """Test cases for User API endpoints"""
    
    def test_create_user(self):
        """Test creating a user via API"""
        url = '/api/users/'
        data = {
            'username': 'API Test Hero',
            'email': 'api@test.com',
            'password': 'test123',
            'team': 'API Team'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().username, 'API Test Hero')
    
    def test_list_users(self):
        """Test listing users via API"""
        User.objects.create(
            username='Hero 1',
            email='hero1@test.com',
            password='pass1',
            team='Team 1'
        )
        User.objects.create(
            username='Hero 2',
            email='hero2@test.com',
            password='pass2',
            team='Team 2'
        )
        url = '/api/users/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)


class TeamAPITest(APITestCase):
    """Test cases for Team API endpoints"""
    
    def test_create_team(self):
        """Test creating a team via API"""
        url = '/api/teams/'
        data = {
            'name': 'API Test Team',
            'description': 'A team created via API',
            'members': []
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Team.objects.count(), 1)


class ActivityAPITest(APITestCase):
    """Test cases for Activity API endpoints"""
    
    def test_create_activity(self):
        """Test creating an activity via API"""
        url = '/api/activities/'
        data = {
            'user_id': 'test_user',
            'activity_type': 'Swimming',
            'duration': 60,
            'distance': 2.0,
            'calories': 400,
            'date': datetime.now().isoformat(),
            'notes': 'Pool session'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Activity.objects.count(), 1)


class LeaderboardAPITest(APITestCase):
    """Test cases for Leaderboard API endpoints"""
    
    def test_list_leaderboard(self):
        """Test listing leaderboard entries via API"""
        Leaderboard.objects.create(
            user_id='user1',
            username='Hero 1',
            team='Team 1',
            total_activities=5,
            total_duration=150,
            total_calories=1500,
            rank=1
        )
        Leaderboard.objects.create(
            user_id='user2',
            username='Hero 2',
            team='Team 2',
            total_activities=3,
            total_duration=90,
            total_calories=900,
            rank=2
        )
        url = '/api/leaderboard/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        # Verify ordering by rank
        self.assertEqual(response.data[0]['rank'], 1)


class WorkoutAPITest(APITestCase):
    """Test cases for Workout API endpoints"""
    
    def test_create_workout(self):
        """Test creating a workout via API"""
        url = '/api/workouts/'
        data = {
            'name': 'API Workout',
            'description': 'Test workout via API',
            'activity_type': 'HIIT',
            'duration': 30,
            'difficulty': 'Advanced',
            'calories_estimate': 600
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Workout.objects.count(), 1)
    
    def test_filter_workouts_by_difficulty(self):
        """Test filtering workouts by difficulty"""
        Workout.objects.create(
            name='Easy Workout',
            description='Easy workout',
            activity_type='Walking',
            duration=30,
            difficulty='Beginner',
            calories_estimate=200
        )
        Workout.objects.create(
            name='Hard Workout',
            description='Hard workout',
            activity_type='HIIT',
            duration=30,
            difficulty='Advanced',
            calories_estimate=600
        )
        url = '/api/workouts/?difficulty=Beginner'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Easy Workout')


class APIRootTest(APITestCase):
    """Test cases for API root endpoint"""
    
    def test_api_root(self):
        """Test that API root returns links to all endpoints"""
        url = '/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('users', response.data)
        self.assertIn('teams', response.data)
        self.assertIn('activities', response.data)
        self.assertIn('leaderboard', response.data)
        self.assertIn('workouts', response.data)
