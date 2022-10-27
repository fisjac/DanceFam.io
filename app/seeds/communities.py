from app.models import db, Community

def seed_communities():
    houston = Community(name='Houston WCS')
    dallas = Community(name='Dallas WCS')
    austin = Community(name='Austin WCS')


    db.session.add_all([houston, dallas, austin])
    db.session.commit()


def undo_communities():
    db.session.execute('TRUNCATE communities RESTART IDENTITY CASCADE;')
    db.session.commit()
