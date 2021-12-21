import React, { useState, useEffect } from 'react'

function Sweets () {
    const [sweets, setSweets] = useState([])
    
    useEffect(async () => {
        const _sweets = await fetch('/api/sweets').then(res => res.json())
        setSweets(_sweets)
        console.log(_sweets)
    }, [])

    return (
        <section>
            {sweets.map(sweet => {
                return <div key={sweet.name}>{sweet.name}</div>
            })}
        </section>
    )
}

export default function App () {
    const [input, setInput] = useState("")

    const onSubmitSweet = () => {
        fetch('/api/sweets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({boiledSweetName: input})
        }).then(_ => {
            setInput("")
        }).catch(console.error)
    }

    return (
        <main>
            <Sweets />
            <input name="sweet" placeholder="add sweet" onChange={e => setInput(e.currentTarget.value)} />
            <button onClick={onSubmitSweet} >Create</button>
        </main>
    )
}