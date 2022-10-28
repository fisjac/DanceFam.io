from app.models import db, Role

def seed_roles():
    organizer = Role(name='Organizer')
    admin = Role(name='Admin')
    member = Role(name='Member')


    db.session.add_all([organizer, admin, member])

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_roles():
    db.session.execute('TRUNCATE roles RESTART IDENTITY CASCADE;')
    db.session.commit()
