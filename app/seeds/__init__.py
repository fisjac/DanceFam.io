from flask.cli import AppGroup
from .users import seed_users, undo_users
# from .types import seed_types, undo_types
# from .styles import seed_styles, undo_styles
# from .roles import seed_roles, undo_roles
# from .statuses import seed_statuses, undo_statuses
# from .communities import seed_communities, undo_communities
from .events import seed_events, undo_events
from .registrations import seed_registrations, undo_registrations
# from .memberships import seed_memberships, undo_memberships


# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    # seed_types()
    # seed_styles()
    # seed_roles()
    # seed_statuses()
    # seed_communities()
    seed_events()
    seed_registrations()
    # seed_memberships()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # undo_types()
    # undo_styles()
    # undo_roles()
    # undo_statuses()
    # undo_communities()
    undo_events()
    undo_registrations()
    # undo_memberships()
    # Add other undo functions here
