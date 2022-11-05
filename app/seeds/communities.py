from app.models import db, Community

def seed_communities():
    dallas = Community(name='Dallas WCS', image_url='https://img1.wsimg.com/isteam/ip/0879c21b-987b-4263-844c-d14ccfae383b/Gary%20Susan%20provided.jpg/:/cr=t:8.27%25,l:0%25,w:100%25,h:49.73%25/rs=w:600,h:300,cg:true')


    db.session.add_all([dallas])
    db.session.commit()


def undo_communities():
    db.session.execute('TRUNCATE communities RESTART IDENTITY CASCADE;')
    db.session.commit()
