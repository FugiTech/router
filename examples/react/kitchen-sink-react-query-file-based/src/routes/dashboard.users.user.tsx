import * as React from 'react'
import { FileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { userQueryOptions } from '../utils/queryOptions'
import { useSuspenseQuery } from '@tanstack/react-query'

export const Route = new FileRoute('/dashboard/users/user').createRoute({
  validateSearch: z.object({
    userId: z.number(),
  }),
  key: ({ search }) => search.userId,
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(
      userQueryOptions(opts.search.userId),
    ),
  component: UserComponent,
})

function UserComponent() {
  const search = Route.useSearch()
  const userQuery = useSuspenseQuery(userQueryOptions(search.userId))
  const user = userQuery.data

  return (
    <>
      <h4 className="p-2 font-bold">{user?.name}</h4>
      <pre className="text-sm whitespace-pre-wrap">
        {JSON.stringify(user, null, 2)}
      </pre>
    </>
  )
}
