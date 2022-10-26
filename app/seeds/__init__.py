from flask.cli import AppGroup
from .users import seed_users, undo_users
from .types import seed_types, undo_types
from .styles import seed_styles, undo_styles
from .roles import seed_roles, undo_roles
from .statuses import seed_statuses, undo_statuses


# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_types()
    seed_styles()
    seed_roles()
    seed_statuses()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_types()
    undo_styles()
    undo_roles()
    undo_statuses()
    # Add other undo functions here
