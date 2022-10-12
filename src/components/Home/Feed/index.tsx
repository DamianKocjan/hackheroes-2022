import React, { useState } from 'react'
import { trpc } from '../../../utils/trpc'

export const Feed: React.FC = () => {
  const [cursor, setCursor] = useState<string | undefined>(undefined)
  const { data,  } = trpc.feed.getAll.useQuery({ cursor });


  return (
    <div>
      {data && data.items.map((item) => JSON.stringify(item))}
    </div>
  )
}
