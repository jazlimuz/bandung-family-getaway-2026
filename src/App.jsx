import React, { useEffect, useMemo, useState } from 'react'
import {
  Plane, Hotel, TrainFront, CarFront, CalendarDays, MapPin, Wallet,
  ListChecks, Lightbulb, Settings, Plus, Pencil, Trash2, Sun, Moon,
  Download, Upload, Save, ChevronLeft, ChevronRight, Clock, Utensils,
  Compass, Users, CircleDollarSign, Check, X, ArrowUpRight, Luggage,
  SlidersHorizontal, Sparkles, RotateCcw
} from 'lucide-react'
import { initialData } from './data'

const clone = (x) => JSON.parse(JSON.stringify(x))
const money = (n) => `S$${Number(n || 0).toLocaleString('en-SG', { maximumFractionDigits: 2 })}`
const id = () => `${Date.now()}-${Math.random().toString(16).slice(2,7)}`
const dateLabel = (value) => value ? new Date(`${value}T12:00:00`).toLocaleDateString('en-SG', { day:'numeric', month:'short', weekday:'short' }) : ''

function Field({ label, value, onChange, type='text', placeholder='', multiline=false, options }) {
  return <label className="field"><span>{label}</span>
    {options ? <select value={value ?? ''} onChange={e=>onChange(e.target.value)}>{options.map(o=><option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>)}</select>
    : multiline ? <textarea rows="3" value={value ?? ''} placeholder={placeholder} onChange={e=>onChange(e.target.value)} />
    : <input type={type} value={value ?? ''} placeholder={placeholder} onChange={e=>onChange(type==='number' ? Number(e.target.value) : e.target.value)} />}
  </label>
}

function Modal({ title, onClose, children, onSave }) {
  return <div className="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&onClose()}>
    <div className="modal"><div className="modal-head"><h3>{title}</h3><button className="icon-btn" onClick={onClose}><X size={18}/></button></div>
      <div className="modal-body">{children}</div>
      <div className="modal-foot"><button className="btn secondary" onClick={onClose}>Cancel</button><button className="btn primary" onClick={onSave}><Check size={16}/> Save changes</button></div>
    </div>
  </div>
}

const tabs = [
  ['itinerary','Itinerary',CalendarDays],['travel','Flights & transport',Plane],['stays','Stays',Hotel],
  ['budget','Budget',Wallet],['packing','Packing list',ListChecks],['ideas','Ideas bank',Lightbulb],['settings','Settings',Settings]
]

export default function App() {
  const [data,setData] = useState(()=>{
    try { const saved=localStorage.getItem('bandung-family-v1'); return saved ? {...clone(initialData),...JSON.parse(saved)} : clone(initialData) } catch { return clone(initialData) }
  })
  const [theme,setTheme] = useState(()=>localStorage.getItem('bandung-theme') || 'light')
  const [tab,setTab] = useState('itinerary')
  const [dayIndex,setDayIndex] = useState(0)
  const [modal,setModal] = useState(null)
  const [draft,setDraft] = useState(null)
  const [toast,setToast] = useState('')
  const [filter,setFilter] = useState('All')
  const [newPacking,setNewPacking] = useState('')
  const [newIdea,setNewIdea] = useState('')

  useEffect(()=>{ document.documentElement.dataset.theme=theme; localStorage.setItem('bandung-theme',theme) },[theme])
  useEffect(()=>{ localStorage.setItem('bandung-family-v1',JSON.stringify(data)) },[data])
  const update = (fn) => setData(prev=>{const next=clone(prev);fn(next);return next})
  const notify = (msg) => { setToast(msg); setTimeout(()=>setToast(''),2200) }
  const activeDay = data.days[Math.min(dayIndex,data.days.length-1)]
  const stayTotal = data.stays.reduce((s,x)=>s+Number(x.priceSgd||0),0)
  const budgetTotals = useMemo(()=>{
    const youtrip=data.budget.reduce((s,r)=>s+Number(r.youtrip||0),0)
    const cash=data.budget.reduce((s,r)=>s+Number(r.cash||0),0)
    const prepaid=data.budget.reduce((s,r)=>s+Number(r.prepaidSgd||0),0)
    return {youtrip,cash,prepaid,total:youtrip+cash/Number(data.trip.currencyRate||11800)+prepaid}
  },[data.budget,data.trip.currencyRate])
  const packingDone=data.packing.filter(x=>x.done).length

  const openEdit = (kind,item,dayId=null) => { setDraft({kind,item:clone(item),dayId}); setModal(kind) }
  const saveDraft = () => {
    if(!draft) return
    update(d=>{
      const {kind,item,dayId}=draft
      if(kind==='activity'){
        const day=d.days.find(x=>x.id===dayId); const ix=day.items.findIndex(x=>x.id===item.id)
        if(ix>=0) day.items[ix]=item; else day.items.push(item)
        day.items.sort((a,b)=>(a.time||'').localeCompare(b.time||''))
      } else if(kind==='stay'){
        const ix=d.stays.findIndex(x=>x.id===item.id); if(ix>=0)d.stays[ix]=item;else d.stays.push(item)
      } else if(kind==='flight'){
        const ix=d.flights.findIndex(x=>x.id===item.id);if(ix>=0)d.flights[ix]=item;else d.flights.push(item)
      } else if(kind==='rail'){
        const ix=d.rail.findIndex(x=>x.id===item.id);if(ix>=0)d.rail[ix]=item;else d.rail.push(item)
      } else if(kind==='transport'){
        const ix=d.transport.findIndex(x=>x.id===item.id);if(ix>=0)d.transport[ix]=item;else d.transport.push(item)
      } else if(kind==='idea'){
        const ix=d.ideas.findIndex(x=>x.id===item.id);if(ix>=0)d.ideas[ix]=item;else d.ideas.push(item)
      } else if(kind==='budget'){
        const ix=d.budget.findIndex(x=>x.id===item.id);if(ix>=0)d.budget[ix]=item;else d.budget.push(item)
      }
    })
    setModal(null);setDraft(null);notify('Changes saved')
  }
  const remove = (collection,itemId,dayId) => {
    if(!window.confirm('Remove this item?'))return
    update(d=>{
      if(collection==='items'){const day=d.days.find(x=>x.id===dayId);day.items=day.items.filter(x=>x.id!==itemId)}
      else d[collection]=d[collection].filter(x=>x.id!==itemId)
    });notify('Item removed')
  }
  const addActivity = (type='activity') => openEdit('activity',{id:id(),time:'Afternoon',type,title:'',place:'',cost:'To estimate',payment:'cash',notes:''},activeDay.id)
  const exportJSON = () => {
    const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'})
    const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='Bandung-Family-Getaway-2026-backup.json';a.click();URL.revokeObjectURL(url);notify('Backup downloaded')
  }
  const importJSON = (e) => {
    const file=e.target.files?.[0];if(!file)return
    const reader=new FileReader();reader.onload=()=>{try{setData({...clone(initialData),...JSON.parse(reader.result)});notify('Backup restored')}catch{notify('Invalid backup file')}};reader.readAsText(file);e.target.value=''
  }
  const reset = () => {if(window.confirm('Reset all trip edits to the original starter plan?')){setData(clone(initialData));notify('Starter plan restored')}}
  const addIdeaToDay = (idea) => {
    update(d=>d.days[dayIndex].items.push({id:id(),time:'Afternoon',type:idea.kind||'activity',title:idea.title,place:idea.category,cost:idea.estimate||'To estimate',payment:'cash',notes:idea.notes}))
    notify(`Added ${idea.title} to Day ${dayIndex+1}`)
  }
  const patchTrip = (key,value) => update(d=>{d.trip[key]=value})
  const changeDay = (idx) => setDayIndex(Math.max(0,Math.min(data.days.length-1,idx)))

  const renderModal = () => {
    if(!draft)return null
    const {kind,item}=draft
    const set=(k,v)=>setDraft(p=>({...p,item:{...p.item,[k]:v}}))
    const field=(k,label,type='text',extra={})=><Field key={k} label={label} value={item[k]} type={type} onChange={v=>set(k,v)} {...extra}/>
    let content=null
    if(kind==='activity') content=<div className="form-grid">
      {field('title','Activity / restaurant name')}{field('type','Type','text',{options:['activity','food','transport','stay']})}
      {field('time','Time')}{field('place','Location')}{field('cost','Estimated cost')}{field('payment','Payment method','text',{options:[{value:'cash',label:'Physical cash'},{value:'youtrip',label:'YouTrip / card'},{value:'prepaid',label:'Prepaid / included'}]})}
      <div className="full">{field('notes','Notes', 'text',{multiline:true})}</div>
    </div>
    if(kind==='stay') content=<div className="form-grid">
      {field('name','Accommodation name')}{field('room','Room type')}
      {field('checkIn','Check-in','date')}{field('checkOut','Check-out','date')}
      {field('nights','Nights','number')}{field('priceSgd','Total price (SGD)','number')}
      {field('breakfast','Breakfast')}{field('location','Location')}
      <div className="full">{field('notes','Notes','text',{multiline:true})}</div>
    </div>
    if(kind==='flight') content=<div className="form-grid">
      {field('direction','Direction')}{field('airline','Airline')}{field('flightNo','Flight number')}
      {field('date','Date','date')}{field('from','From')}{field('to','To')}{field('depart','Departure')}{field('arrive','Arrival')}
      {field('status','Status') }<div className="full">{field('notes','Notes','text',{multiline:true})}</div>
    </div>
    if(kind==='rail') content=<div className="form-grid">
      {field('title','Journey')}{field('date','Date','date')}{field('route','Route')}{field('time','Time')}{field('class','Class')}{field('status','Status')}
      <div className="full">{field('notes','Notes','text',{multiline:true})}</div>
    </div>
    if(kind==='transport') content=<div className="form-grid">
      {field('day','Day number','number')}{field('mode','Mode of transport')}{field('route','Route')}{field('payment','Payment method')}
      <div className="full">{field('notes','Notes','text',{multiline:true})}</div>
    </div>
    if(kind==='idea') content=<div className="form-grid">
      {field('title','Idea / place name')}{field('category','Area / category')}{field('kind','Type','text',{options:['activity','food']})}{field('estimate','Estimated cost')}
      <div className="full">{field('notes','Notes','text',{multiline:true})}</div>
    </div>
    if(kind==='budget') content=<div className="form-grid">
      {field('category','Budget category')}{field('youtrip','YouTrip allocation (SGD)','number')}{field('cash','Physical cash allocation (IDR)','number')}{field('prepaidSgd','Already paid (SGD)','number')}
      <div className="full">{field('notes','Notes','text',{multiline:true})}</div>
    </div>
    return <Modal title={`${draft.item.id && (kind==='activity'?'Edit itinerary item':`Edit ${kind}`)}`} onClose={()=>{setModal(null);setDraft(null)}} onSave={saveDraft}>{content}</Modal>
  }

  return <div className="app-shell">
    <header className="hero">
      <div className="hero-top"><div className="brand"><div className="brand-mark">B.</div><div><div className="eyebrow">FAMILY TRAVEL JOURNAL · INDONESIA</div><h1>Bandung <em>Getaway</em></h1></div></div>
        <div className="hero-actions"><button className="hero-btn" onClick={exportJSON}><Download size={15}/> Backup</button><label className="hero-btn upload-btn"><Upload size={15}/> Restore<input hidden type="file" accept=".json,application/json" onChange={importJSON}/></label><button className="theme-btn" onClick={()=>setTheme(theme==='light'?'dark':'light')} title="Toggle theme">{theme==='light'?<Moon size={17}/>:<Sun size={17}/>}</button></div>
      </div>
      <div className="hero-copy"><span className="date-pill"><CalendarDays size={14}/> 22 — 27 NOVEMBER 2026</span><h2>Six days. Three of us. <br/><span>One little adventure.</span></h2><p>A flexible family itinerary for Bandung, Lembang and beyond.</p></div>
      <div className="hero-stats">
        <div><Users/><span>TRAVELLERS</span><strong>{data.trip.adults} adults · {data.trip.children} child</strong></div>
        <div><Hotel/><span>STAYS</span><strong>{data.stays.length} accommodations</strong></div>
        <div><Wallet/><span>SPENDING POOL</span><strong>{money(data.wallet.totalSgd)}</strong></div>
        <div><ListChecks/><span>PACKING</span><strong>{packingDone}/{data.packing.length} packed</strong></div>
      </div>
    </header>

    <nav className="tabbar">{tabs.map(([key,label,Icon])=><button key={key} className={tab===key?'active':''} onClick={()=>setTab(key)}><Icon size={16}/><span>{label}</span></button>)}</nav>

    <main className="content">
      {tab==='itinerary'&&<section>
        <div className="section-heading"><div><div className="eyebrow">YOUR DAY, YOUR PACE</div><h2>The itinerary</h2><p>Move things around, add stops or leave the day beautifully empty.</p></div><button className="btn primary" onClick={()=>addActivity()}><Plus size={16}/> Add to day</button></div>
        <div className="day-strip">{data.days.map((d,i)=><button key={d.id} onClick={()=>changeDay(i)} className={i===dayIndex?'selected':''}><small>DAY {i+1}</small><strong>{new Date(d.date+'T12:00:00').toLocaleDateString('en-SG',{day:'numeric',month:'short'})}</strong><span>{d.area}</span></button>)}</div>
        {activeDay&&<div className="day-layout"><div className="day-main card">
          <div className="day-title"><div><span className="eyebrow">DAY {dayIndex+1} · {dateLabel(activeDay.date)}</span><h3>{activeDay.title}</h3><p><MapPin size={14}/>{activeDay.area}</p></div><span className="day-number">0{dayIndex+1}</span></div>
          <Field label="Day title" value={activeDay.title} onChange={v=>update(d=>{d.days[dayIndex].title=v})}/>
          <Field label="Area / route" value={activeDay.area} onChange={v=>update(d=>{d.days[dayIndex].area=v})}/>
          <Field label="Pacing notes" value={activeDay.pace} multiline onChange={v=>update(d=>{d.days[dayIndex].pace=v})}/>
          <div className="timeline">{activeDay.items.map(item=><article className={`timeline-item ${item.type}`} key={item.id}>
            <div className="timeline-time">{item.time}</div><div className="timeline-dot"></div><div className="timeline-card">
              <div className="item-top"><span className={`type-tag ${item.type}`}>{item.type}</span><div className="item-actions"><button className="icon-btn" onClick={()=>openEdit('activity',item,activeDay.id)}><Pencil size={15}/></button><button className="icon-btn danger" onClick={()=>remove('items',item.id,activeDay.id)}><Trash2 size={15}/></button></div></div>
              <h4>{item.title}</h4><p className="item-place"><MapPin size={13}/>{item.place}</p>{item.notes&&<p className="item-notes">{item.notes}</p>}
              <div className="item-bottom"><span><CircleDollarSign size={13}/>{item.cost||'Cost not set'}</span><span>{item.payment==='cash'?'Cash':item.payment==='youtrip'?'YouTrip':'Prepaid / included'}</span></div>
            </div></article>)}</div>
          <button className="add-dashed" onClick={()=>addActivity()}><Plus size={16}/> Add activity, meal or transfer</button>
          <div className="day-controls"><button className="btn secondary" disabled={dayIndex===0} onClick={()=>changeDay(dayIndex-1)}><ChevronLeft size={16}/> Previous day</button><button className="btn secondary" disabled={dayIndex===data.days.length-1} onClick={()=>changeDay(dayIndex+1)}>Next day <ChevronRight size={16}/></button></div>
        </div><aside className="side-stack">
          <div className="side-card"><span className="eyebrow">OVERNIGHT STAY</span>{(()=>{const h=data.stays.find(s=>s.id===activeDay.hotelId);return h?<><h4>{h.name}</h4><p>{h.room}</p><small>{h.checkIn} → {h.checkOut}</small></>:<p>Stay not assigned</p>})()}</div>
          <div className="side-card warm"><span className="eyebrow">FAMILY PACE CHECK</span><p>{activeDay.pace}</p><small>Leave room for snack stops, toilet breaks and Melissa's energy levels.</small></div>
          <div className="side-card"><span className="eyebrow">QUICK ADD FROM IDEAS</span>{data.ideas.slice(0,4).map(x=><button className="idea-quick" key={x.id} onClick={()=>addIdeaToDay(x)}><span>{x.title}</span><Plus size={14}/></button>)}</div>
        </aside></div>}
      </section>}

      {tab==='travel'&&<section><div className="section-heading"><div><div className="eyebrow">GETTING THERE & GETTING AROUND</div><h2>Flights & transport</h2><p>Keep flight, Whoosh and ground-transfer details in one place.</p></div><button className="btn primary" onClick={()=>openEdit('flight',{id:id(),direction:'Outbound',airline:'',flightNo:'',date:'2026-11-22',from:'',to:'',depart:'',arrive:'',status:'To confirm',notes:''})}><Plus size={16}/> Add flight</button></div>
        <div className="subsection"><h3><Plane size={18}/> Flights</h3><div className="grid two">{data.flights.map(f=><div className="card flight-card" key={f.id}><div className="card-top"><span className="type-tag transport">{f.direction}</span><button className="icon-btn" onClick={()=>openEdit('flight',f)}><Pencil size={15}/></button></div><h3>{f.airline}</h3><small>{f.flightNo} · {f.status}</small><div className="flight-route"><div><strong>{f.depart}</strong><span>{f.from}</span></div><ArrowUpRight/><div><strong>{f.arrive}</strong><span>{f.to}</span></div></div><p className="muted">{dateLabel(f.date)} · {f.notes}</p></div>)}</div></div>
        <div className="subsection"><div className="subhead"><h3><TrainFront size={18}/> Whoosh high-speed rail</h3><button className="btn small secondary" onClick={()=>openEdit('rail',{id:id(),title:'New rail journey',date:'2026-11-22',route:'',time:'To confirm',class:'Business Class',status:'Not purchased',notes:''})}><Plus size={14}/> Add rail</button></div><div className="grid two">{data.rail.map(r=><div className="card compact" key={r.id}><div className="card-top"><b>{r.title}</b><button className="icon-btn" onClick={()=>openEdit('rail',r)}><Pencil size={15}/></button></div><h4>{r.route}</h4><p>{dateLabel(r.date)} · {r.time}</p><div className="meta-row"><span>{r.class}</span><span>{r.status}</span></div><p className="muted">{r.notes}</p></div>)}</div></div>
        <div className="subsection"><div className="subhead"><h3><CarFront size={18}/> Ground transport plan</h3><button className="btn small secondary" onClick={()=>openEdit('transport',{id:id(),day:1,mode:'GrabCar',route:'',payment:'To confirm',notes:''})}><Plus size={14}/> Add transfer</button></div><div className="card table-card">{data.transport.map(t=><div className="transport-row" key={t.id}><div className="transport-day">D{t.day}</div><div className="transport-info"><b>{t.mode}</b><span>{t.route}</span><small>{t.notes}</small></div><div className="transport-pay">{t.payment}</div><button className="icon-btn" onClick={()=>openEdit('transport',t)}><Pencil size={15}/></button><button className="icon-btn danger" onClick={()=>remove('transport',t.id)}><Trash2 size={15}/></button></div>)}</div></div>
      </section>}

      {tab==='stays'&&<section><div className="section-heading"><div><div className="eyebrow">WHERE YOU'LL WAKE UP</div><h2>Accommodations</h2><p>Your two confirmed stays, with editable booking details.</p></div><button className="btn primary" onClick={()=>openEdit('stay',{id:id(),name:'',room:'',checkIn:'2026-11-22',checkOut:'2026-11-23',nights:1,priceSgd:0,breakfast:'To confirm',location:'',notes:''})}><Plus size={16}/> Add stay</button></div>
        <div className="stay-summary"><div><span className="eyebrow">TOTAL BOOKED ACCOMMODATION</span><strong>{money(stayTotal)}</strong></div><p>Both stays are marked as booked in your planning notes. Prices can be edited any time.</p></div>
        <div className="grid two">{data.stays.map((s,i)=><div className="card stay-card" key={s.id}><div className="stay-art"><span>STAY 0{i+1}</span><Hotel size={28}/></div><div className="stay-body"><div className="card-top"><span className="type-tag stay">BOOKED</span><button className="icon-btn" onClick={()=>openEdit('stay',s)}><Pencil size={15}/></button></div><h3>{s.name}</h3><p>{s.location}</p><div className="stay-dates"><div><small>CHECK IN</small><b>{dateLabel(s.checkIn)}</b></div><div><small>CHECK OUT</small><b>{dateLabel(s.checkOut)}</b></div></div><div className="stay-details"><span>{s.room}</span><span>{s.nights} nights</span><span>Breakfast: {s.breakfast}</span></div><p className="muted">{s.notes}</p><strong className="stay-price">{money(s.priceSgd)}</strong></div></div>)}</div>
      </section>}

      {tab==='budget'&&<section><div className="section-heading"><div><div className="eyebrow">SPEND WITH A PLAN</div><h2>Budget & wallets</h2><p>Track your S$1,200 spending pool separately from expenses already paid.</p></div><button className="btn primary" onClick={()=>openEdit('budget',{id:id(),category:'New category',youtrip:0,cash:0,prepaidSgd:0,notes:''})}><Plus size={16}/> Add category</button></div>
        <div className="wallet-grid"><div className="wallet-card"><span>TRIP SPENDING POOL</span><strong>{money(data.wallet.totalSgd)}</strong><small>Editable total travel spending money</small></div><div className="wallet-card youtrip"><span>YO U T R I P</span><strong>{money(data.wallet.youtripSgd)}</strong><small>Card / app payment allocation</small></div><div className="wallet-card cash"><span>PHYSICAL CASH</span><strong>{money(data.wallet.cashSgd)}</strong><small>Cash budget equivalent · {Number(data.wallet.physicalCashIdr||0).toLocaleString()} IDR</small></div></div>
        <div className="card wallet-editor"><div className="subhead"><h3><SlidersHorizontal size={17}/> Wallet allocation</h3><span className="type-tag">EDITABLE</span></div><div className="form-grid"><Field label="Total spending pool (SGD)" type="number" value={data.wallet.totalSgd} onChange={v=>update(d=>{d.wallet.totalSgd=v})}/><Field label="Physical cash allocation (SGD)" type="number" value={data.wallet.cashSgd} onChange={v=>update(d=>{d.wallet.cashSgd=v;d.wallet.youtripSgd=Number(d.wallet.totalSgd)-Number(v)})}/><Field label="YouTrip allocation (SGD)" type="number" value={data.wallet.youtripSgd} onChange={v=>update(d=>{d.wallet.youtripSgd=v;d.wallet.totalSgd=Number(v)+Number(d.wallet.cashSgd)})}/><Field label="Cash to carry (IDR)" type="number" value={data.wallet.physicalCashIdr} onChange={v=>update(d=>{d.wallet.physicalCashIdr=v})}/><Field label="Exchange rate (IDR per S$1)" type="number" value={data.trip.currencyRate} onChange={v=>patchTrip('currencyRate',v)}/></div><p className="hint">Your allocation is a planning split, not a live bank balance. Change it whenever your plans or payment acceptance change.</p></div>
        <div className="subsection"><h3>Category allocation</h3><div className="card table-card">{data.budget.map(b=><div className="budget-row" key={b.id}><div className="budget-name"><b>{b.category}</b><small>{b.notes}</small></div><div><small>YO U T R I P</small><b>{money(b.youtrip)}</b></div><div><small>CASH</small><b>{Number(b.cash||0).toLocaleString()} IDR</b></div><div><small>PREPAID</small><b>{money(b.prepaidSgd)}</b></div><button className="icon-btn" onClick={()=>openEdit('budget',b)}><Pencil size={15}/></button><button className="icon-btn danger" onClick={()=>remove('budget',b.id)}><Trash2 size={15}/></button></div>)}</div></div>
        <div className="budget-foot"><div><span>Planned YouTrip spend</span><strong>{money(budgetTotals.youtrip)}</strong></div><div><span>Planned cash spend</span><strong>{Number(budgetTotals.cash).toLocaleString()} IDR</strong></div><div><span>Already paid / booked</span><strong>{money(budgetTotals.prepaid)}</strong></div></div>
      </section>}

      {tab==='packing'&&<section><div className="section-heading"><div><div className="eyebrow">DON'T LEAVE THE IMPORTANT STUFF</div><h2>Packing list</h2><p>Tick items off as you pack. Add your own essentials anytime.</p></div><div className="progress-ring"><strong>{data.packing.length?Math.round(packingDone/data.packing.length*100):0}%</strong><span>packed</span></div></div>
        <div className="progress-track"><span style={{width:`${data.packing.length?packingDone/data.packing.length*100:0}%`}}/></div>
        <div className="packing-add"><input placeholder="Add a packing item…" value={newPacking} onChange={e=>setNewPacking(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&newPacking.trim()){update(d=>d.packing.push({id:id(),group:'Custom',text:newPacking.trim(),done:false}));setNewPacking('')}}}/><button className="btn primary" onClick={()=>{if(newPacking.trim()){update(d=>d.packing.push({id:id(),group:'Custom',text:newPacking.trim(),done:false}));setNewPacking('')}}}><Plus size={16}/> Add item</button></div>
        <div className="packing-groups">{[...new Set(data.packing.map(p=>p.group))].map(group=><div className="card packing-group" key={group}><h3><Luggage size={17}/>{group}</h3>{data.packing.filter(p=>p.group===group).map(p=><div className="packing-item" key={p.id}><label><input type="checkbox" checked={p.done} onChange={()=>update(d=>{const x=d.packing.find(v=>v.id===p.id);x.done=!x.done})}/><span className={p.done?'done':''}>{p.text}</span></label><button className="icon-btn danger" onClick={()=>remove('packing',p.id)}><Trash2 size={14}/></button></div>)}</div>)}</div>
      </section>}

      {tab==='ideas'&&<section><div className="section-heading"><div><div className="eyebrow">OPTIONAL STOPS & BACKUP PLANS</div><h2>Ideas bank</h2><p>Keep alternatives here, then add them to whichever day you choose.</p></div></div>
        <div className="idea-tools"><div className="filter-pills">{['All','Lembang','Ciwidey','City','Shopping'].map(x=><button className={filter===x?'chosen':''} key={x} onClick={()=>setFilter(x)}>{x}</button>)}</div><div className="add-idea"><input placeholder="Add a new place or restaurant…" value={newIdea} onChange={e=>setNewIdea(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&newIdea.trim()){openEdit('idea',{id:id(),title:newIdea.trim(),category:'City',kind:'activity',estimate:'To verify',notes:''});setNewIdea('')}}}/><button className="btn primary" onClick={()=>{if(newIdea.trim()){openEdit('idea',{id:id(),title:newIdea.trim(),category:'City',kind:'activity',estimate:'To verify',notes:''});setNewIdea('')}}}><Plus size={15}/></button></div></div>
        <div className="grid three">{data.ideas.filter(x=>filter==='All'||x.category===filter).map(x=><div className="card idea-card" key={x.id}><div className="idea-icon">{x.kind==='food'?<Utensils/>:<Compass/>}</div><div className="card-top"><span className="type-tag">{x.category}</span><div><button className="icon-btn" onClick={()=>openEdit('idea',x)}><Pencil size={14}/></button><button className="icon-btn danger" onClick={()=>remove('ideas',x.id)}><Trash2 size={14}/></button></div></div><h3>{x.title}</h3><p>{x.notes}</p><small>{x.estimate}</small><div className="idea-add-row"><select id={`target-${x.id}`} defaultValue={dayIndex}>{data.days.map((d,i)=><option value={i} key={d.id}>Day {i+1} · {dateLabel(d.date)}</option>)}</select><button className="btn small primary" onClick={()=>{const idx=Number(document.getElementById(`target-${x.id}`).value);setDayIndex(idx);update(d=>d.days[idx].items.push({id:id(),time:'Afternoon',type:x.kind||'activity',title:x.title,place:x.category,cost:x.estimate||'To estimate',payment:'cash',notes:x.notes}));notify('Added to itinerary')}}><Plus size={14}/> Add</button></div></div>)}</div>
      </section>}

      {tab==='settings'&&<section><div className="section-heading"><div><div className="eyebrow">MAKE IT YOURS</div><h2>Settings</h2><p>Personalise the dashboard and manage your trip data.</p></div></div>
        <div className="settings-grid"><div className="card settings-card"><h3><Sun size={18}/> Appearance</h3><p>Choose the dashboard theme.</p><div className="theme-options"><button className={theme==='light'?'selected':''} onClick={()=>setTheme('light')}><Sun/>Light mode</button><button className={theme==='dark'?'selected':''} onClick={()=>setTheme('dark')}><Moon/>Dark mode</button></div></div>
          <div className="card settings-card"><h3><Users size={18}/> Travellers & trip</h3><div className="form-grid"><Field label="Adults" type="number" value={data.trip.adults} onChange={v=>patchTrip('adults',v)}/><Field label="Children" type="number" value={data.trip.children} onChange={v=>patchTrip('children',v)}/><Field label="Child age" value={data.trip.childAge} onChange={v=>patchTrip('childAge',v)}/><Field label="Trip name" value={data.trip.name} onChange={v=>patchTrip('name',v)}/><Field label="Start date" type="date" value={data.trip.startDate} onChange={v=>patchTrip('startDate',v)}/><Field label="End date" type="date" value={data.trip.endDate} onChange={v=>patchTrip('endDate',v)}/><div className="full"><Field label="Trip notes" value={data.trip.notes} multiline onChange={v=>patchTrip('notes',v)}/></div></div></div>
          <div className="card settings-card"><h3><Save size={18}/> Save & backup</h3><p>Changes save automatically in this browser. Export a backup before changing devices or browsers.</p><div className="settings-actions"><button className="btn primary" onClick={()=>{localStorage.setItem('bandung-family-v1',JSON.stringify(data));notify('Saved to this browser')}}><Save size={15}/> Save now</button><button className="btn secondary" onClick={exportJSON}><Download size={15}/> Export backup</button><label className="btn secondary"><Upload size={15}/> Import backup<input hidden type="file" accept=".json,application/json" onChange={importJSON}/></label></div></div>
          <div className="card settings-card danger-zone"><h3><RotateCcw size={18}/> Reset dashboard</h3><p>Restore the original starter itinerary and remove your local edits.</p><button className="btn danger-btn" onClick={reset}>Reset all trip data</button></div>
        </div>
        <div className="notice"><Sparkles size={17}/><p><b>About saving:</b> automatic saving uses this browser's local storage. It does not sync between devices. Use Backup / Restore to move your changes between your iPhone and computer.</p></div>
      </section>}
    </main>
    <footer><span>MADE FOR YOUR LITTLE BANDUNG ADVENTURE</span><span>22—27 NOV 2026 · {data.trip.adults} ADULTS + {data.trip.children} CHILD</span></footer>
    {toast&&<div className="toast"><Check size={16}/>{toast}</div>}
    {renderModal()}
  </div>
}
