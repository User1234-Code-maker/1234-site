# Бесшовный по вертикали фон из облаков арта: тянется на всю страницу (repeat-y)
import numpy as np, random, os
from PIL import Image, ImageFilter, ImageEnhance
D=os.path.join(os.path.dirname(__file__),'..','src','assets','img')+'/'
W,H=1600,2000
def tile(kind):
    random.seed(11)
    if kind=='day':
        top=np.array([231,234,253]);mid=np.array([222,226,252]);
        cols=[(214,225,251),(204,214,250),(218,210,247),(226,218,248),(210,222,251),(214,225,251)]
    else:
        cols=[(11,16,48),(16,20,64),(26,20,74),(14,20,62),(11,16,48)]
    y=np.linspace(0,1,H)
    stops=np.linspace(0,1,len(cols))
    arr=np.zeros((H,W,3))
    for c in range(3):
        arr[...,c]=np.interp(y,stops,[k[c] for k in cols])[:,None]
    img=Image.fromarray(arr.astype(np.uint8)).convert('RGBA')
    clouds=[Image.open(D+f).convert('RGBA') for f in ['cloud-a.webp','cloud-b.webp','cloud-c.webp']]
    placements=[(0,-260,-80,1300,0.9),(1,820,260,1100,0.85),(2,-240,640,1000,0.75),(0,700,900,1300,0.85),(1,-300,1240,1200,0.85),(2,900,1520,1000,0.7),(1,300,1800,900,0.6),(2,420,420,700,0.45)]
    for idx,x,yy,w,op in placements:
        c=clouds[idx]; c=c.resize((w,int(c.height*w/c.width)),Image.LANCZOS)
        if kind=='night':
            r,g,b,a=c.split()
            c=Image.merge('RGBA',(r.point(lambda v:int(v*0.34)),g.point(lambda v:int(v*0.36)),b.point(lambda v:int(v*0.66)),a))
        a=np.asarray(c.split()[3]).astype(np.float32)*op
        hh,ww=a.shape
        fy=np.clip(np.minimum(np.arange(hh),hh-1-np.arange(hh))/(hh*0.28),0,1)[:,None]
        fx=np.clip(np.minimum(np.arange(ww),ww-1-np.arange(ww))/(ww*0.18),0,1)[None,:]
        a=a*fy*fx
        c.putalpha(Image.fromarray(a.astype(np.uint8)))
        for dy in (-H,0,H):  # заворачиваем по вертикали, чтобы шов совпал
            img.alpha_composite(c,(x,yy+dy)) if 0<=yy+dy<H or (yy+dy<0 and yy+dy+c.height>0) else None
    if kind=='night':
        from PIL import ImageDraw
        d=ImageDraw.Draw(img)
        for _ in range(260):
            x=random.randrange(W);yy=random.randrange(H);s=random.choice([1,1,1,2])
            a=random.randint(90,220);d.ellipse((x,yy,x+s,yy+s),fill=(220,225,255,a))
    out=img.convert('RGB')
    out.save(D+f'backdrop-{kind}.webp','WEBP',quality=70,method=6)
    out.resize((800,1000),Image.LANCZOS).save(D+f'backdrop-{kind}-sm.webp','WEBP',quality=62,method=6)
tile('day');tile('night')
for f in sorted(os.listdir(D)):
    if f.startswith('backdrop'): print(f,os.path.getsize(D+f)//1024,'KB')
