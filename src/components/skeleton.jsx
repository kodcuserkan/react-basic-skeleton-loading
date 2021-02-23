import React from 'react'
import MySkeleton from 'react-loading-skeleton'

const Skeleton = ({count}) => {
    let blocks =[]
    for (let index = 0; index < count; index++) {
        blocks.push(`Skeleton: ${index}`)
    }
    return (
        <div>
            {
                blocks.map((e,i) => {
                    return <div className="single-post" key={i}>
                        <MySkeleton count={5} />
                    </div>
                })
            }
        </div>
    )
}

export default Skeleton
