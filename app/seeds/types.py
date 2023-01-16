from app.models import db, Type

def seed_types():
    convention = Type(name='Convention')
    weekend_workshop = Type(name='Weekend Workshop')
    solo_class = Type(name='Class')
    social = Type(name='social')


    db.session.add_all([convention, weekend_workshop, solo_class, social])

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_types():
    db.session.execute('TRUNCATE types RESTART IDENTITY CASCADE;')
    db.session.commit()
