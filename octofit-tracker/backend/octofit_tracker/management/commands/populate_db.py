from django.core.management.base import BaseCommand
from datetime import datetime, timedelta
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Starting database population...'))
        
        # Delete existing data
        self.stdout.write('Deleting existing data...')
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()
        self.stdout.write(self.style.SUCCESS('Existing data deleted'))
        
        # Create Teams
        self.stdout.write('Creating teams...')
        team_marvel = Team.objects.create(
            name='Team Marvel',
            description='Earth\'s Mightiest Heroes fighting for fitness',
            members=[]
        )
        
        team_dc = Team.objects.create(
            name='Team DC',
            description='Justice League of Fitness Champions',
            members=[]
        )
        self.stdout.write(self.style.SUCCESS(f'Created {Team.objects.count()} teams'))
        
        # Create Users (Superheroes)
        self.stdout.write('Creating users...')
        
        # Marvel Heroes
        iron_man = User.objects.create(
            username='Iron Man',
            email='tony.stark@marvel.com',
            password='arc_reactor_3000',
            team='Team Marvel'
        )
        
        captain_america = User.objects.create(
            username='Captain America',
            email='steve.rogers@marvel.com',
            password='shield_bearer',
            team='Team Marvel'
        )
        
        black_widow = User.objects.create(
            username='Black Widow',
            email='natasha.romanoff@marvel.com',
            password='red_room_elite',
            team='Team Marvel'
        )
        
        thor = User.objects.create(
            username='Thor',
            email='thor.odinson@marvel.com',
            password='asgard_prince',
            team='Team Marvel'
        )
        
        hulk = User.objects.create(
            username='Hulk',
            email='bruce.banner@marvel.com',
            password='gamma_smash',
            team='Team Marvel'
        )
        
        # DC Heroes
        superman = User.objects.create(
            username='Superman',
            email='clark.kent@dc.com',
            password='krypton_last_son',
            team='Team DC'
        )
        
        batman = User.objects.create(
            username='Batman',
            email='bruce.wayne@dc.com',
            password='dark_knight',
            team='Team DC'
        )
        
        wonder_woman = User.objects.create(
            username='Wonder Woman',
            email='diana.prince@dc.com',
            password='amazon_warrior',
            team='Team DC'
        )
        
        flash = User.objects.create(
            username='Flash',
            email='barry.allen@dc.com',
            password='speed_force',
            team='Team DC'
        )
        
        aquaman = User.objects.create(
            username='Aquaman',
            email='arthur.curry@dc.com',
            password='atlantis_king',
            team='Team DC'
        )
        
        self.stdout.write(self.style.SUCCESS(f'Created {User.objects.count()} users'))
        
        # Update team members
        team_marvel.members = [str(iron_man._id), str(captain_america._id), str(black_widow._id), 
                               str(thor._id), str(hulk._id)]
        team_marvel.save()
        
        team_dc.members = [str(superman._id), str(batman._id), str(wonder_woman._id), 
                          str(flash._id), str(aquaman._id)]
        team_dc.save()
        
        # Create Activities
        self.stdout.write('Creating activities...')
        
        activities_data = [
            # Iron Man - Tech-focused workouts
            {'user': iron_man, 'type': 'Flying', 'duration': 60, 'distance': 100, 'calories': 800},
            {'user': iron_man, 'type': 'Combat Training', 'duration': 45, 'distance': None, 'calories': 600},
            {'user': iron_man, 'type': 'Cycling', 'duration': 90, 'distance': 50, 'calories': 900},
            
            # Captain America - Endurance training
            {'user': captain_america, 'type': 'Running', 'duration': 120, 'distance': 25, 'calories': 1200},
            {'user': captain_america, 'type': 'Boxing', 'duration': 60, 'distance': None, 'calories': 700},
            {'user': captain_america, 'type': 'Swimming', 'duration': 75, 'distance': 5, 'calories': 850},
            
            # Black Widow - Agility focused
            {'user': black_widow, 'type': 'Martial Arts', 'duration': 90, 'distance': None, 'calories': 950},
            {'user': black_widow, 'type': 'Yoga', 'duration': 60, 'distance': None, 'calories': 300},
            {'user': black_widow, 'type': 'Running', 'duration': 45, 'distance': 10, 'calories': 500},
            
            # Thor - Power training
            {'user': thor, 'type': 'Weightlifting', 'duration': 90, 'distance': None, 'calories': 800},
            {'user': thor, 'type': 'Hammer Throwing', 'duration': 60, 'distance': None, 'calories': 700},
            {'user': thor, 'type': 'Battle Training', 'duration': 120, 'distance': None, 'calories': 1100},
            
            # Hulk - High intensity
            {'user': hulk, 'type': 'Smashing', 'duration': 30, 'distance': None, 'calories': 900},
            {'user': hulk, 'type': 'Weightlifting', 'duration': 60, 'distance': None, 'calories': 850},
            {'user': hulk, 'type': 'Jumping', 'duration': 45, 'distance': 20, 'calories': 750},
            
            # Superman - Super workouts
            {'user': superman, 'type': 'Flying', 'duration': 90, 'distance': 200, 'calories': 1000},
            {'user': superman, 'type': 'Rescue Missions', 'duration': 120, 'distance': 150, 'calories': 1300},
            {'user': superman, 'type': 'Strength Training', 'duration': 60, 'distance': None, 'calories': 800},
            
            # Batman - Tactical training
            {'user': batman, 'type': 'Combat Training', 'duration': 120, 'distance': None, 'calories': 1100},
            {'user': batman, 'type': 'Running', 'duration': 60, 'distance': 15, 'calories': 700},
            {'user': batman, 'type': 'Martial Arts', 'duration': 90, 'distance': None, 'calories': 950},
            
            # Wonder Woman - Warrior training
            {'user': wonder_woman, 'type': 'Sword Training', 'duration': 90, 'distance': None, 'calories': 900},
            {'user': wonder_woman, 'type': 'Combat Training', 'duration': 105, 'distance': None, 'calories': 1000},
            {'user': wonder_woman, 'type': 'Running', 'duration': 75, 'distance': 20, 'calories': 850},
            
            # Flash - Speed training
            {'user': flash, 'type': 'Running', 'duration': 30, 'distance': 500, 'calories': 1500},
            {'user': flash, 'type': 'Sprint Training', 'duration': 45, 'distance': 300, 'calories': 1200},
            {'user': flash, 'type': 'Cardio', 'duration': 60, 'distance': 400, 'calories': 1400},
            
            # Aquaman - Water-based
            {'user': aquaman, 'type': 'Swimming', 'duration': 120, 'distance': 30, 'calories': 1300},
            {'user': aquaman, 'type': 'Underwater Combat', 'duration': 90, 'distance': None, 'calories': 950},
            {'user': aquaman, 'type': 'Trident Training', 'duration': 75, 'distance': None, 'calories': 800},
        ]
        
        for i, activity_data in enumerate(activities_data):
            Activity.objects.create(
                user_id=str(activity_data['user']._id),
                activity_type=activity_data['type'],
                duration=activity_data['duration'],
                distance=activity_data['distance'],
                calories=activity_data['calories'],
                date=datetime.now() - timedelta(days=i % 7),
                notes=f"Training session for {activity_data['user'].username}"
            )
        
        self.stdout.write(self.style.SUCCESS(f'Created {Activity.objects.count()} activities'))
        
        # Create Leaderboard entries
        self.stdout.write('Creating leaderboard entries...')
        
        leaderboard_data = [
            {'user': flash, 'activities': 3, 'duration': 135, 'calories': 4100},
            {'user': superman, 'activities': 3, 'duration': 270, 'calories': 3100},
            {'user': batman, 'activities': 3, 'duration': 270, 'calories': 2750},
            {'user': wonder_woman, 'activities': 3, 'duration': 270, 'calories': 2750},
            {'user': aquaman, 'activities': 3, 'duration': 285, 'calories': 3050},
            {'user': captain_america, 'activities': 3, 'duration': 255, 'calories': 2750},
            {'user': thor, 'activities': 3, 'duration': 270, 'calories': 2600},
            {'user': iron_man, 'activities': 3, 'duration': 195, 'calories': 2300},
            {'user': black_widow, 'activities': 3, 'duration': 195, 'calories': 1750},
            {'user': hulk, 'activities': 3, 'duration': 135, 'calories': 2500},
        ]
        
        for rank, lb_data in enumerate(leaderboard_data, start=1):
            Leaderboard.objects.create(
                user_id=str(lb_data['user']._id),
                username=lb_data['user'].username,
                team=lb_data['user'].team,
                total_activities=lb_data['activities'],
                total_duration=lb_data['duration'],
                total_calories=lb_data['calories'],
                rank=rank
            )
        
        self.stdout.write(self.style.SUCCESS(f'Created {Leaderboard.objects.count()} leaderboard entries'))
        
        # Create Workouts
        self.stdout.write('Creating workout suggestions...')
        
        workouts = [
            {
                'name': 'Super Soldier Strength',
                'description': 'Build strength like Captain America with this intensive strength training routine',
                'activity_type': 'Weightlifting',
                'duration': 60,
                'difficulty': 'Advanced',
                'calories_estimate': 700
            },
            {
                'name': 'Web-Slinging Cardio',
                'description': 'High-intensity cardio workout to improve agility and endurance',
                'activity_type': 'Cardio',
                'duration': 45,
                'difficulty': 'Intermediate',
                'calories_estimate': 600
            },
            {
                'name': 'Kryptonian Power Hour',
                'description': 'Full-body strength and endurance training inspired by Superman',
                'activity_type': 'Strength Training',
                'duration': 90,
                'difficulty': 'Advanced',
                'calories_estimate': 900
            },
            {
                'name': 'Speed Force Sprint',
                'description': 'Lightning-fast sprint intervals to boost your speed and metabolism',
                'activity_type': 'Running',
                'duration': 30,
                'difficulty': 'Intermediate',
                'calories_estimate': 500
            },
            {
                'name': 'Amazonian Warrior Workout',
                'description': 'Combat-inspired training combining strength and martial arts',
                'activity_type': 'Combat Training',
                'duration': 75,
                'difficulty': 'Advanced',
                'calories_estimate': 800
            },
            {
                'name': 'Dark Knight Patrol',
                'description': 'Tactical urban training with running and bodyweight exercises',
                'activity_type': 'Running',
                'duration': 60,
                'difficulty': 'Intermediate',
                'calories_estimate': 650
            },
            {
                'name': 'Atlantean Swim Session',
                'description': 'Comprehensive swimming workout for full-body conditioning',
                'activity_type': 'Swimming',
                'duration': 60,
                'difficulty': 'Beginner',
                'calories_estimate': 550
            },
            {
                'name': 'Asgardian Thunder Training',
                'description': 'Powerful workout combining hammer swings and weightlifting',
                'activity_type': 'Weightlifting',
                'duration': 75,
                'difficulty': 'Advanced',
                'calories_estimate': 750
            },
            {
                'name': 'Widow\'s Flexibility Flow',
                'description': 'Yoga and stretching routine for maximum flexibility and core strength',
                'activity_type': 'Yoga',
                'duration': 45,
                'difficulty': 'Beginner',
                'calories_estimate': 300
            },
            {
                'name': 'Gamma Rage HIIT',
                'description': 'High-intensity interval training for explosive power',
                'activity_type': 'HIIT',
                'duration': 30,
                'difficulty': 'Advanced',
                'calories_estimate': 600
            },
        ]
        
        for workout_data in workouts:
            Workout.objects.create(**workout_data)
        
        self.stdout.write(self.style.SUCCESS(f'Created {Workout.objects.count()} workout suggestions'))
        
        # Summary
        self.stdout.write(self.style.SUCCESS('\n=== Database Population Complete ==='))
        self.stdout.write(self.style.SUCCESS(f'Teams: {Team.objects.count()}'))
        self.stdout.write(self.style.SUCCESS(f'Users: {User.objects.count()}'))
        self.stdout.write(self.style.SUCCESS(f'Activities: {Activity.objects.count()}'))
        self.stdout.write(self.style.SUCCESS(f'Leaderboard entries: {Leaderboard.objects.count()}'))
        self.stdout.write(self.style.SUCCESS(f'Workouts: {Workout.objects.count()}'))
