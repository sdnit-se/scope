# Record visibility and change audiences

This is the rule Scope uses once Twenty's licensed row-level rules and record sharing are gone. It was written before the code, from these sources only:

- Twenty's public documentation in this repository: `user-guide/permissions-access/capabilities/permissions.mdx`, `user-guide/permissions-access/how-tos/permissions-faq.mdx`, `developers/extend/apps/config/roles.mdx` and `developers/extend/apps/logic/logic-functions.mdx`.
- The owner's decision of 19 November on record visibility (option B, "your role alone decides").
- The baseline measured on a copy of production on 18 November: every person, application and API key that may read an object sees the same records as an Admin; nobody is narrowed record by record; every record change in the scripted set reached all 13 of the Shebang app's event-triggered functions.

No file carrying the licence marker was read to write it.

## Who may read, change or delete a record

Every request acts as someone: a workspace member, an API key, an application's function or an AI agent. Each has one role. Work the server does on its own behalf (migrations, upgrade commands, internal jobs) is the system and acts without a role.

1. The system may do anything to any record.
2. An operation an object switches off is refused to everyone except the application that owns the object. The objects the platform keeps for itself (AI messages and turns, the sharing table, short links, campaign deliveries and suppressions) switch off every operation, so no role reads or writes them; the baseline shows every role, Admin included, refused on them today.
3. Otherwise the role decides, per object and per operation: read, update, soft delete and destroy. A role that may read an object reads every record of it; a role that may not reads none.
4. Field permissions apply as before: a field the role may not read is left out of answers, and a field it may not update is refused on write.
5. Nothing narrows records one by one. There are no row-level rules, no sharing grants, no private records and no visibility inherited from a parent record. Workflow runs, AI chats, notes, tasks, attachments and timeline entries follow the role's permission on their own object, like every other object.

## Who hears about a change

A change is a record being created, updated, deleted, destroyed, restored or upserted.

- **An application's function** subscribed to that change hears it when the application's role may read the object. The event leaves out the fields that role may not read, and an update that touched only such fields is not sent.
- **An AI agent** triggered by that change hears it under the same rule, with the agent's role.
- **A workflow** triggered by that change hears it under the same rule, with the role the workflow runs as.
- **A person watching live updates** hears it when their role may read the object, with the same field rule.
- **A webhook** has no role. Only someone allowed to manage webhooks can set one up, and it hears every change on the objects it names. The baseline's scripted changes reached no webhook, so it has none to compare.

## What stays

- The `recordShare` object and table, the row-level tables and every column stay in the database, unused.
- The upgrade history stays as it ran.
- Each object's stored readability stays as data; it no longer narrows records.

## What changes compared with the baseline

Only records that private or inherited visibility hid from a role that may read their object. The baseline found none for notes, tasks, attachments, timeline entries and AI chats: every role that may read them sees as many as an Admin. Admins and the Admin API key saw no workflow runs; if any exist on the day of the switch, they will see them, as the owner's decision expects.
