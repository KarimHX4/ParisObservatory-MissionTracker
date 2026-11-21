// Sprites des missions, style BD rétro (contours noirs), inspirés de l'apparence réelle de chaque engin.
// Chaque sprite est dessiné dans une boîte d'environ 60 unités centrée sur (0,0) ; drawSprite met à l'échelle.
const SPR=(()=>{
 let c,LW=2.4;
 const ol=(f,w)=>{if(f){c.fillStyle=f;c.fill()}c.lineWidth=w||LW;c.strokeStyle='#0b0d1f';c.stroke()};
 const R=(x,y,w,h,f,w2)=>{c.beginPath();c.rect(x,y,w,h);ol(f,w2)};
 const E=(x,y,rx,ry,f,rot=0,w2)=>{c.beginPath();c.ellipse(x,y,rx,ry,rot,0,7);ol(f,w2)};
 const P=(pts,f,w2)=>{c.beginPath();pts.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.closePath();ol(f,w2)};
 const Ln=(pts,w,col)=>{c.beginPath();pts.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.lineWidth=w;c.strokeStyle=col||'#0b0d1f';c.lineCap='round';c.stroke()};
 const grid=(x,y,w,h,nx,ny,col)=>{c.save();c.strokeStyle=col||'rgba(140,175,255,.55)';c.lineWidth=.5;
  for(let i=1;i<nx;i++){c.beginPath();c.moveTo(x+i*w/nx,y);c.lineTo(x+i*w/nx,y+h);c.stroke()}
  for(let j=1;j<ny;j++){c.beginPath();c.moveTo(x,y+j*h/ny);c.lineTo(x+w,y+j*h/ny);c.stroke()}c.restore()};
 const panel=(x,y,w,h,nx=4,ny=3,f='#22306e')=>{R(x,y,w,h,f);grid(x,y,w,h,nx,ny);c.fillStyle='rgba(255,255,255,.16)';c.beginPath();c.moveTo(x+1,y+1);c.lineTo(x+w*.4,y+1);c.lineTo(x+1,y+h*.6);c.fill()};
 const mli=(x,y,w,h,base='#e8b23a')=>{R(x,y,w,h,base);c.save();c.beginPath();c.rect(x,y,w,h);c.clip();c.strokeStyle='rgba(110,60,0,.45)';c.lineWidth=.6;
  for(let i=-h;i<w;i+=3.4){c.beginPath();c.moveTo(x+i,y+h);c.lineTo(x+i+h*.6,y);c.stroke()}c.fillStyle='rgba(255,255,255,.22)';c.fillRect(x+1,y+1,w*.22,h-2);c.restore()};
 const dish=(x,y,r,rot=0,f='#f6f4ee')=>{c.save();c.translate(x,y);c.rotate(rot);E(0,0,r,r*.38,f);c.beginPath();c.ellipse(0,-r*.06,r*.7,r*.24,0,0,7);c.fillStyle='rgba(0,0,0,.07)';c.fill();
  Ln([[-r*.6,-r*.1],[0,-r*.6],[r*.6,-r*.1]],.8);E(0,-r*.6,r*.11,r*.11,'#ffd23f',0,1);c.restore()};
 const S={
 bepi(){ // MPO (radiateur + aile solaire unique + antenne) au-dessus de Mio (prisme octogonal + pare-soleil)
  Ln([[10,-16],[17,-16]],2);panel(17,-23,30,14,6,2);
  R(-12,-26,24,20,'#eef0f4');grid(-12,-26,24,20,4,1,'rgba(40,50,80,.35)');R(-12,-8,24,3,'#3a3f5c');
  Ln([[-10,-24],[-18,-32]],1.6);dish(-21,-35,7,-.6);
  P([[-14,-4],[14,-4],[18,3],[14,10],[-14,10],[-18,3]],'#c9cfdb');grid(-14,-4,28,14,6,1,'rgba(40,50,80,.3)');
  P([[-16,10],[16,10],[22,20],[-22,20]],'#f2f2f2');E(0,20,22,3.5,'#e3e3e3')},
 juice(){ // grandes ailes solaires en croix (10 panneaux), corps doré, antenne de 2,5 m, perche magnétomètre
  for(const s of [-1,1]){Ln([[s*7,0],[s*12,0]],2);for(let k=0;k<5;k++){const x=s>0?12+k*9:-21-k*9;panel(x,-7,8,14,2,3)}}
  Ln([[0,-2],[0,-40]],1.2,'#9aa2b8');E(0,-40,1.8,1.8,'#ff7a2f',0,1);
  mli(-8,-10,16,22);dish(0,-14,13,0);E(0,20,4,2,'#7a7f92')},
 solo(){ // bouclier thermique noir face au Soleil, corps, deux ailes, perche instruments, antenne
  for(const s of [-1,1]){Ln([[s*9,4],[s*14,4]],2);panel(s>0?14:-38,-1,24,10,5,2)}
  mli(-9,-6,18,20,'#d9b44a');R(-13,-18,26,12,'#2a2a2a');for(let i=0;i<4;i++)E(-8+i*5.4,-12,1.6,1.6,'#555',0,.8);
  Ln([[9,10],[22,24]],1.2,'#9aa2b8');dish(-6,20,7,.4)},
 psp(){ // grand bouclier thermique blanc (TPS), corps hexagonal, petits panneaux refroidis
  E(0,-14,22,7,'#f4f4f0');E(0,-15,22,6,'#e6e6e0');Ln([[-10,-9],[-8,2]],1.4);Ln([[10,-9],[8,2]],1.4);
  P([[-9,2],[9,2],[12,10],[9,18],[-9,18],[-12,10]],'#d9b44a');panel(-24,6,11,7,2,2);panel(13,6,11,7,2,2);
  Ln([[0,18],[0,30]],1.2,'#9aa2b8');E(0,31,2,2,'#41e0ff',0,1)},
 perseverance(){ // rover 6 roues, mât avec tête SuperCam, RTG à l'arrière, bras robotique
  R(-18,-2,32,11,'#eef0f4');R(-18,-4,32,3,'#c9cfdb');P([[14,-2],[22,-6],[24,4],[14,8]],'#9aa2b8');
  Ln([[-12,-4],[-12,-22]],2.4);R(-17,-28,12,7,'#eef0f4');E(-13,-25,2.2,2.2,'#41e0ff',0,1);R(-8,-26,3,3,'#3a3f5c',1);
  Ln([[-18,4],[-26,-2],[-30,6]],2);R(-33,5,6,4,'#ff7a2f',1.2);
  Ln([[-14,9],[-10,15],[2,15],[8,9]],1.6);for(const x of [-15,-2,11]){E(x,17,4.6,4.6,'#3a3f5c');E(x,17,1.8,1.8,'#9aa2b8',0,1)}},
 mex(){ // cube doré, deux ailes, antenne, longue antenne radar MARSIS
  Ln([[-34,-26],[34,26]],1,'#c9c9d6');Ln([[-6,14],[-6,38]],1,'#c9c9d6');
  for(const s of [-1,1]){Ln([[s*10,0],[s*14,0]],2);panel(s>0?14:-38,-7,24,14,5,3)}
  mli(-10,-10,20,20);dish(0,-14,10,0)},
 jwst(){ // pare-soleil violet en losange + miroir de 18 hexagones dorés + secondaire
  P([[-30,10],[0,-2],[30,10],[0,24]],'#b48cff');P([[-26,11],[0,1],[26,11],[0,21]],'#c9a8ff',1);
  const hx=(x,y,r)=>{c.beginPath();for(let i=0;i<6;i++){const a=i*Math.PI/3+Math.PI/6;c.lineTo(x+Math.cos(a)*r,y+Math.sin(a)*r)}c.closePath();ol('#ffd23f',1.4)};
  const r=4.2,dx=r*1.73,dy=r*1.5;for(const [i,j] of [[0,-2],[1,-2],[-1,-2],[-1.5,-1],[-.5,-1],[.5,-1],[1.5,-1],[-1,0],[1,0],[-1.5,1],[-.5,1],[.5,1],[1.5,1],[-1,2],[0,2],[1,2],[-2,0],[2,0]])hx(i*dx,-14+j*dy,r);
  Ln([[-10,-4],[0,-30],[10,-4]],1.2);E(0,-30,2.2,2.2,'#ffd23f',0,1)},
 juno(){ // trois longues ailes solaires à 120°, corps hexagonal, antenne au centre
  for(let k=0;k<3;k++){c.save();c.rotate(k*2.094-1.57);Ln([[8,0],[11,0]],2);for(let i=0;i<4;i++)panel(11+i*6.5,-4,6,8,1,2);c.restore()}
  P([[-9,-5],[0,-10],[9,-5],[9,5],[0,10],[-9,5]],'#d9dde8');dish(0,-1,8,0)},
 stereo(){ // corps, deux panneaux, grande antenne, perche
  for(const s of [-1,1]){Ln([[s*9,4],[s*13,4]],2);panel(s>0?13:-33,-2,20,12,4,3)}
  mli(-9,-6,18,18,'#d9b44a');dish(0,-12,11,-.2);Ln([[0,12],[0,30]],1.2,'#9aa2b8')},
 wind(){ // tambour cylindrique couvert de cellules, antennes filaires et perches
  Ln([[-40,2],[40,2]],.8,'#c9c9d6');Ln([[0,-24],[0,-38]],1.2,'#9aa2b8');Ln([[0,24],[0,38]],1.2,'#9aa2b8');
  R(-14,-12,28,24,'#22306e');grid(-14,-12,28,24,6,4);E(0,-12,14,4,'#c9cfdb');E(0,12,14,4,'#3a3f5c')},
 voyager1(){},
 aces(){ // Station spatiale : poutre, grandes ailes solaires, modules ; ACES sur Columbus
  R(-34,-1.5,68,3,'#c9c9d6');for(const x of [-34,-24,16,26]){panel(x,-26,8,22,1,4,'#b38a2e');panel(x,4,8,22,1,4,'#b38a2e')}
  R(-6,-10,12,20,'#eef0f4');E(0,-10,6,2,'#eef0f4');R(-14,-4,8,8,'#eef0f4');R(6,-3,10,6,'#eef0f4');R(10,-6,5,4,'#41e0ff',1.2)},
 osirisrex(){ // corps, deux panneaux, antenne, bras TAGSAM
  for(const s of [-1,1]){Ln([[s*9,-2],[s*13,-2]],2);panel(s>0?13:-31,-9,18,13,4,3)}
  R(-9,-10,18,20,'#eef0f4');R(-9,-10,18,4,'#d9b44a');dish(0,-14,9,0);Ln([[6,10],[14,22],[10,30]],1.8);E(10,31,3.5,2,'#ff7a2f');E(-4,13,4,2,'#c84a2d')},
 hayabusa2(){ // corps doré, deux panneaux, deux antennes plates, moteurs ioniques
  for(const s of [-1,1]){Ln([[s*10,0],[s*14,0]],2);panel(s>0?14:-38,-8,24,16,6,3)}
  mli(-10,-10,20,20);R(-8,-17,7,6,'#d9dde8',1.4);E(3,-14,6,2.4,'#f6f4ee');for(const x of [-6,0,6])E(x,12,2,2,'#41e0ff',0,1)},
 rosetta(){ // très longues ailes solaires, corps, grande antenne latérale, Philae
  for(const s of [-1,1]){Ln([[s*7,0],[s*10,0]],2);for(let k=0;k<5;k++){const x=s>0?10+k*7:-17-k*7;panel(x,-6,6.5,12,1,3)}}
  mli(-7,-9,14,18,'#d9b44a');dish(-2,-17,11,-.35);R(3,9,7,5,'#c9cfdb',1.4);Ln([[4,14],[2,17]],1);Ln([[9,14],[11,17]],1)},
 cassini(){ // grand empilement, antenne de 4 m, RTG, sonde Huygens, perche
  E(0,-22,20,6,'#f6f4ee');Ln([[-12,-19],[0,-30],[12,-19]],.9);E(0,-30,2,2,'#ffd23f',0,1);
  R(-8,-17,16,10,'#e8e8e8');mli(-9,-7,18,22,'#2a2a2a');R(-6,15,12,8,'#d9b44a');E(0,24,5,2,'#7a7f92');
  E(14,2,6,6,'#d98a3a');E(14,2,3.5,3.5,'#f2c26b',0,1);for(const s of [-1,1])R(s>0?9:-15,10,6,3,'#6b6f80',1.4);
  Ln([[-8,-10],[-34,-16]],1,'#c9c9d6')},
 vex(){ // dérivé de Mars Express : cube doré, deux ailes, antenne
  for(const s of [-1,1]){Ln([[s*10,0],[s*14,0]],2);panel(s>0?14:-36,-7,22,14,4,3)}
  mli(-10,-10,20,20);dish(2,-14,9,.2);E(-6,-13,3,1.4,'#f6f4ee',0,1)},
 galileo(){ // grande antenne parapluie, perches RTG, perche magnétomètre, sonde de descente
  c.beginPath();for(let i=0;i<=18;i++){const a=Math.PI+i/18*Math.PI,r=i%2?19:15;c.lineTo(Math.cos(a)*r*1.1,-14+Math.sin(a)*r*.45)}c.closePath();ol('#f6f4ee');
  Ln([[0,-14],[0,-26]],1.2);R(-8,-12,16,14,'#d9dde8');R(-6,2,12,8,'#e8b23a');
  for(const s of [-1,1]){Ln([[s*8,-4],[s*26,6]],1.6);R(s>0?24:-30,4,6,4,'#6b6f80',1.2)}Ln([[0,10],[0,32]],1,'#c9c9d6');E(0,12,4,2.2,'#c84a2d',0,1.2)},
 ulysses(){ // corps, grande antenne au-dessus, perche RTG radiale, antennes filaires
  Ln([[-38,6],[38,6]],.8,'#c9c9d6');Ln([[0,12],[0,34]],.8,'#c9c9d6');
  R(-12,-2,24,14,'#d9b44a');dish(0,-10,14,0);Ln([[12,4],[26,4]],2);R(24,0,8,8,'#6b6f80',1.4);Ln([[-12,4],[-26,-6]],1.2,'#9aa2b8')},
 gaia(){ // grand pare-soleil circulaire déployé + cylindre / tente thermique
  E(0,12,30,8,'#22306e');grid(-30,4,60,16,12,1,'rgba(140,175,255,.4)');E(0,11,30,7,null);
  P([[-14,10],[14,10],[10,-16],[-10,-16]],'#eef0f4');E(0,-16,10,3,'#dfe3ea');E(0,10,14,4,null);Ln([[-4,-16],[-2,10]],.6,'rgba(0,0,0,.25)')},
 herschel(){ // grand miroir de 3,5 m, cryostat, pare-soleil avec cellules
  E(0,-22,20,6,'#e9eef5');E(0,-22,4,1.4,'#3a3f5c',0,1);Ln([[-14,-20],[0,-34],[14,-20]],.8);
  R(-10,-16,20,26,'#d9dde8');E(0,-16,10,3,'#c9cfdb');P([[12,-24],[20,-18],[20,22],[12,16]],'#22306e');grid(12,-20,8,38,1,5);
  P([[-12,10],[12,10],[16,20],[-16,20]],'#e8b23a')},
 planck(){ // baffle conique, écrans en « V », module de service octogonal
  for(let i=0;i<3;i++)E(0,-2+i*-5,20-i*4,5-i,'#e6e9f0',0,1.6);
  P([[-7,-20],[7,-20],[10,-34],[-10,-34]],'#f2f2f2');E(0,-34,10,2.5,'#dfe3ea');
  P([[-14,0],[14,0],[18,8],[14,16],[-14,16],[-18,8]],'#d9b44a');E(0,16,18,3,'#22306e')},
 corot(){ // long télescope cylindrique (baffle) sur une plateforme, deux panneaux
  R(-6,-34,12,30,'#eef0f4');E(0,-34,6,2,'#3a3f5c');for(let i=0;i<3;i++)R(-6,-28+i*8,12,1.4,'#c9cfdb',.8);
  mli(-10,-4,20,16);for(const s of [-1,1]){Ln([[s*10,6],[s*14,6]],2);panel(s>0?14:-34,0,20,12,4,2)}},
 cluster(){ // quatre satellites-tambours en formation, avec perches
  for(const [x,y,k] of [[-14,-12,1],[14,-14,.9],[-12,14,.9],[16,12,1]]){c.save();c.translate(x,y);c.scale(k,k);
   Ln([[-16,0],[16,0]],.8,'#c9c9d6');R(-8,-5,16,10,'#22306e');grid(-8,-5,16,10,4,2);E(0,-5,8,2.2,'#d9b44a');E(0,5,8,2.2,'#3a3f5c');c.restore()}
  c.setLineDash([2,3]);Ln([[-14,-12],[14,-14],[16,12],[-12,14],[-14,-12]],.7,'rgba(255,243,214,.6)');c.setLineDash([])},
 image(){ // tambour octogonal, très longues antennes filaires du sondeur RPI
  Ln([[-42,-10],[42,10]],.8,'#c9c9d6');Ln([[-42,10],[42,-10]],.8,'#c9c9d6');Ln([[0,-14],[0,-32]],1,'#c9c9d6');Ln([[0,14],[0,32]],1,'#c9c9d6');
  P([[-12,-10],[-5,-14],[5,-14],[12,-10],[12,10],[5,14],[-5,14],[-12,10]],'#22306e');grid(-12,-14,24,28,6,4);E(0,-12,8,2,'#d9b44a',0,1.2)},
 plato(){ // 26 caméras en grappe sur la plateforme, pare-soleil
  P([[-24,14],[24,14],[28,24],[-28,24]],'#22306e');grid(-28,14,56,10,8,1);R(-18,4,36,10,'#d9dde8');
  const cam=(x,y)=>{E(x,y,3.4,3.4,'#3a3f5c',0,1.2);E(x,y,1.6,1.6,'#41e0ff',0,.8)};
  for(let j=0;j<4;j++)for(let i=0;i<(j%2?6:7);i++)cam(-18+i*6+(j%2?3:0),-14+j*5);E(0,-20,4,4,'#ffd23f',0,1.2);E(9,-20,4,4,'#ffd23f',0,1.2)},
 ariel(){ // miroir elliptique dans un baffle ovale, écrans thermiques en « V »
  for(let i=0;i<3;i++)P([[-24+i*2,4+i*4],[24-i*2,4+i*4],[18-i*2,8+i*4],[-18+i*2,8+i*4]],i%2?'#d9dde8':'#eef0f4',1.4);
  c.save();c.translate(0,-10);c.rotate(-.3);E(0,0,16,10,'#eef0f4');E(0,0,12,7,'#ffd23f',0,1.2);c.restore();
  P([[-12,16],[12,16],[14,24],[-14,24]],'#d9b44a');for(const s of [-1,1])panel(s>0?14:-22,17,8,7,2,1)},
 dragonfly(){ // giravion : corps de lander, 4 bras portant chacun 2 rotors, RTG
  R(-14,-4,28,12,'#eef0f4');R(-14,-4,28,3,'#c9cfdb');R(-4,8,8,6,'#6b6f80');
  for(const [x,y] of [[-24,-12],[24,-12],[-24,4],[24,4]]){Ln([[x*.5,y*.3],[x,y]],2);E(x,y-3,10,2,'rgba(200,220,255,.55)',0,1.2);E(x,y+1,10,2,'rgba(200,220,255,.55)',0,1.2);E(x,y-1,1.6,1.6,'#3a3f5c',0,1)}
  for(const s of [-1,1])Ln([[s*10,8],[s*14,16]],1.6)},
 envision(){ // corps, deux ailes, grande antenne, antenne radar VenSAR
  for(const s of [-1,1]){Ln([[s*10,2],[s*14,2]],2);panel(s>0?14:-34,-4,20,12,4,3)}
  mli(-10,-8,20,18);dish(-3,-14,10,-.2);P([[10,8],[28,14],[28,20],[10,14]],'#d9dde8',1.6);grid(10,8,18,12,4,1,'rgba(40,50,80,.35)')},
 veritas(){ // corps, deux ailes, longue antenne radar interférométrique, antenne
  R(-34,14,68,6,'#d9dde8');grid(-34,14,68,6,10,1,'rgba(40,50,80,.35)');Ln([[0,8],[0,14]],2);
  for(const s of [-1,1]){Ln([[s*9,-2],[s*13,-2]],2);panel(s>0?13:-31,-8,18,12,4,3)}
  mli(-9,-10,18,18);dish(0,-14,8,0)}
 };
 // demi-largeur de chaque dessin (unités) pour qu'ils tiennent tous dans la même boîte
 const EXT={bepi:48,juice:58,solo:38,psp:32,perseverance:34,mex:40,jwst:35,juno:40,stereo:33,wind:40,aces:35,osirisrex:31,hayabusa2:38,rosetta:52,cassini:36,vex:36,galileo:33,ulysses:38,gaia:31,herschel:35,planck:35,corot:36,cluster:31,image:42,plato:30,ariel:28,dragonfly:35,envision:35,veritas:35};
 return{has:id=>!!S[id]&&id!=='voyager1',draw(ctx,q,id,size,ang,big){c=ctx;LW=big?1.8:2.4;c.save();c.translate(q[0],q[1]);c.rotate(ang||0);const k=size/(2*Math.max(30,EXT[id]||30));c.scale(k,k);c.lineJoin='round';S[id]();c.restore()}};
})();
