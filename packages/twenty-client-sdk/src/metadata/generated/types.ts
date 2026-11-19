export default {
    "scalars": [
        1,
        4,
        6,
        7,
        10,
        11,
        13,
        15,
        18,
        25,
        27,
        30,
        33,
        35,
        42,
        55,
        63,
        66,
        72,
        84,
        88,
        89,
        91,
        96,
        101,
        107,
        112,
        118,
        121,
        122,
        123,
        124,
        129,
        131,
        145,
        149,
        151,
        153,
        196,
        197,
        218,
        222,
        233,
        237,
        240,
        247,
        258,
        270,
        277,
        278,
        279,
        291,
        293,
        308,
        309,
        310,
        311,
        312,
        313,
        315,
        316,
        317,
        319,
        320,
        323,
        325,
        329,
        333,
        342,
        349,
        350,
        351,
        354,
        358,
        359,
        364,
        368,
        387,
        389,
        390,
        393,
        398,
        410,
        412,
        416,
        434,
        443,
        444,
        446,
        471,
        534,
        554,
        561,
        563,
        567,
        577,
        583,
        584,
        586,
        587,
        589,
        590,
        591,
        594,
        595,
        600,
        602,
        605,
        610,
        611,
        612,
        614,
        615
    ],
    "types": {
        "ActivateWorkspaceInput": {
            "displayName": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "String": {},
        "AddQuerySubscriptionInput": {
            "eventStreamId": [
                1
            ],
            "operationSignature": [
                277
            ],
            "queryId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "Agent": {
            "applicationId": [
                471
            ],
            "createdAt": [
                197
            ],
            "description": [
                1
            ],
            "icon": [
                1
            ],
            "id": [
                471
            ],
            "isActive": [
                4
            ],
            "isCustom": [
                4
            ],
            "isSystem": [
                4
            ],
            "label": [
                1
            ],
            "modelConfiguration": [
                277
            ],
            "modelId": [
                1
            ],
            "name": [
                1
            ],
            "prompt": [
                1
            ],
            "responseFormat": [
                277
            ],
            "roleId": [
                471
            ],
            "triggers": [
                277
            ],
            "updatedAt": [
                197
            ],
            "__typename": [
                1
            ]
        },
        "Boolean": {},
        "AgentChatChannel": {
            "applicationId": [
                471
            ],
            "color": [
                1
            ],
            "icon": [
                1
            ],
            "id": [
                471
            ],
            "isAccessible": [
                4
            ],
            "isCustom": [
                4
            ],
            "name": [
                1
            ],
            "position": [
                6
            ],
            "roleIds": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "Float": {},
        "AgentChatChannelAssignmentFilter": {},
        "AgentChatChannelRole": {
            "canAccessAllAgentChatChannels": [
                4
            ],
            "icon": [
                1
            ],
            "id": [
                471
            ],
            "label": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "AgentChatChannelSummary": {
            "assignedCount": [
                10
            ],
            "assignedToMeCount": [
                10
            ],
            "channelId": [
                471
            ],
            "doneCount": [
                10
            ],
            "hasUnreadAssignedToMe": [
                4
            ],
            "hasUnreadOpen": [
                4
            ],
            "mentionedCount": [
                10
            ],
            "needsInputCount": [
                10
            ],
            "openCount": [
                10
            ],
            "snoozedCount": [
                10
            ],
            "unassignedCount": [
                10
            ],
            "__typename": [
                1
            ]
        },
        "Int": {},
        "AgentChatChannelThreadFilter": {},
        "AgentChatChannelThreadIds": {
            "endCursor": [
                1
            ],
            "hasNextPage": [
                4
            ],
            "threadIds": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "AgentChatChannelThreadStatus": {},
        "AgentChatEvent": {
            "event": [
                277
            ],
            "threadId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "AgentChatInboxAction": {},
        "AgentChatOpenThreadsSummary": {
            "assignedThreadCount": [
                10
            ],
            "assignedToMeThreadCount": [
                10
            ],
            "hasUnreadAssignedThread": [
                4
            ],
            "hasUnreadMentionThread": [
                4
            ],
            "hasUnreadOpenThread": [
                4
            ],
            "mentionThreadCount": [
                10
            ],
            "needsInputThreadCount": [
                10
            ],
            "openThreadCount": [
                10
            ],
            "unassignedThreadCount": [
                10
            ],
            "unreadOpenThreadCount": [
                10
            ],
            "__typename": [
                1
            ]
        },
        "AgentChatThread": {
            "contextWindowTokens": [
                10
            ],
            "conversationSize": [
                10
            ],
            "createdAt": [
                197
            ],
            "deletedAt": [
                197
            ],
            "id": [
                18
            ],
            "title": [
                1
            ],
            "totalCacheReadTokens": [
                10
            ],
            "totalInputCredits": [
                6
            ],
            "totalInputTokens": [
                10
            ],
            "totalOutputCredits": [
                6
            ],
            "totalOutputTokens": [
                10
            ],
            "updatedAt": [
                197
            ],
            "__typename": [
                1
            ]
        },
        "ID": {},
        "AgentChatThreadParticipant": {
            "archivedAt": [
                197
            ],
            "id": [
                471
            ],
            "isSubscribed": [
                4
            ],
            "lastMentionedAt": [
                197
            ],
            "lastReadAt": [
                197
            ],
            "mentionsResolvedAt": [
                197
            ],
            "snoozedUntil": [
                197
            ],
            "threadId": [
                471
            ],
            "updatedAt": [
                197
            ],
            "__typename": [
                1
            ]
        },
        "AgentIdInput": {
            "id": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "AgentMessage": {
            "agentId": [
                471
            ],
            "createdAt": [
                197
            ],
            "id": [
                471
            ],
            "parts": [
                22
            ],
            "processedAt": [
                197
            ],
            "reactions": [
                23
            ],
            "role": [
                1
            ],
            "senderUserWorkspaceId": [
                471
            ],
            "senderWorkspaceMemberId": [
                471
            ],
            "status": [
                1
            ],
            "threadId": [
                471
            ],
            "turnId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "AgentMessagePart": {
            "createdAt": [
                197
            ],
            "errorMessage": [
                1
            ],
            "fileFilename": [
                1
            ],
            "fileId": [
                471
            ],
            "fileMediaType": [
                1
            ],
            "fileUrl": [
                1
            ],
            "id": [
                471
            ],
            "messageId": [
                471
            ],
            "orderIndex": [
                10
            ],
            "providerExecuted": [
                4
            ],
            "providerMetadata": [
                277
            ],
            "reasoningContent": [
                1
            ],
            "sourceDocumentFilename": [
                1
            ],
            "sourceDocumentMediaType": [
                1
            ],
            "sourceDocumentSourceId": [
                1
            ],
            "sourceDocumentTitle": [
                1
            ],
            "sourceUrlSourceId": [
                1
            ],
            "sourceUrlTitle": [
                1
            ],
            "sourceUrlUrl": [
                1
            ],
            "state": [
                1
            ],
            "textContent": [
                1
            ],
            "toolCallId": [
                1
            ],
            "toolInput": [
                277
            ],
            "toolName": [
                1
            ],
            "toolOutput": [
                277
            ],
            "type": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "AgentMessageReactionSummary": {
            "agentIds": [
                471
            ],
            "emoji": [
                1
            ],
            "hasAssistantReacted": [
                4
            ],
            "workspaceMemberIds": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "AgentRun": {
            "createdAt": [
                197
            ],
            "creatorName": [
                1
            ],
            "creatorSource": [
                1
            ],
            "credits": [
                6
            ],
            "endedAt": [
                197
            ],
            "errorMessage": [
                1
            ],
            "id": [
                471
            ],
            "input": [
                1
            ],
            "inputTokens": [
                10
            ],
            "modelId": [
                1
            ],
            "outputTokens": [
                10
            ],
            "reply": [
                1
            ],
            "startedAt": [
                197
            ],
            "status": [
                25
            ],
            "threadId": [
                471
            ],
            "threadTitle": [
                1
            ],
            "toolNames": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "AgentTurnStatus": {},
        "AggregateChartConfiguration": {
            "aggregateFieldMetadataId": [
                471
            ],
            "aggregateOperation": [
                27
            ],
            "configurationType": [
                594
            ],
            "description": [
                1
            ],
            "displayDataLabel": [
                4
            ],
            "filter": [
                277
            ],
            "firstDayOfTheWeek": [
                10
            ],
            "label": [
                1
            ],
            "numberFormat": [
                131
            ],
            "prefix": [
                1
            ],
            "ratioAggregateConfig": [
                382
            ],
            "suffix": [
                1
            ],
            "timezone": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "AggregateOperations": {},
        "AiChatUsage": {
            "consumedValue": [
                91
            ],
            "kind": [
                1
            ],
            "limitValue": [
                91
            ],
            "periodEnd": [
                197
            ],
            "__typename": [
                1
            ]
        },
        "AiChatUserCreditsUsage": {
            "consumedValue": [
                91
            ],
            "limitValue": [
                91
            ],
            "periodEnd": [
                197
            ],
            "__typename": [
                1
            ]
        },
        "AiModelTier": {},
        "AiSystemPromptPreview": {
            "estimatedTokenCount": [
                10
            ],
            "sections": [
                32
            ],
            "__typename": [
                1
            ]
        },
        "AiSystemPromptSection": {
            "content": [
                1
            ],
            "estimatedTokenCount": [
                10
            ],
            "title": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "AllMetadataName": {},
        "Analytics": {
            "success": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "AnalyticsType": {},
        "ApiConfig": {
            "mutationMaximumAffectedRecords": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "ApiKey": {
            "createdAt": [
                197
            ],
            "expiresAt": [
                197
            ],
            "id": [
                471
            ],
            "name": [
                1
            ],
            "revokedAt": [
                197
            ],
            "role": [
                404
            ],
            "updatedAt": [
                197
            ],
            "__typename": [
                1
            ]
        },
        "ApiKeyForRole": {
            "expiresAt": [
                197
            ],
            "id": [
                471
            ],
            "name": [
                1
            ],
            "revokedAt": [
                197
            ],
            "__typename": [
                1
            ]
        },
        "ApiKeyToken": {
            "token": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "AppConnection": {
            "accessToken": [
                1
            ],
            "authFailedAt": [
                1
            ],
            "authFailedReason": [
                1
            ],
            "externalAccountId": [
                1
            ],
            "handle": [
                1
            ],
            "id": [
                18
            ],
            "name": [
                1
            ],
            "providerName": [
                1
            ],
            "providerType": [
                1
            ],
            "scope": [
                149
            ],
            "scopes": [
                1
            ],
            "userWorkspaceId": [
                1
            ],
            "visibility": [
                1
            ],
            "workspaceMemberId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "AppKeyValue": {
            "key": [
                1
            ],
            "scope": [
                42
            ],
            "value": [
                277
            ],
            "__typename": [
                1
            ]
        },
        "AppKeyValueScope": {},
        "AppMessageFolderInput": {
            "externalId": [
                1
            ],
            "isSynced": [
                4
            ],
            "name": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "AppMessageInput": {
            "externalId": [
                1
            ],
            "folderExternalIds": [
                1
            ],
            "participants": [
                45
            ],
            "receivedAt": [
                197
            ],
            "subject": [
                1
            ],
            "text": [
                1
            ],
            "threadExternalId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "AppMessageParticipantInput": {
            "displayName": [
                1
            ],
            "handle": [
                1
            ],
            "personId": [
                471
            ],
            "role": [
                317
            ],
            "workspaceMemberId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "Application": {
            "agents": [
                3
            ],
            "applicationRegistration": [
                68
            ],
            "applicationRegistrationId": [
                471
            ],
            "applicationVariables": [
                71
            ],
            "autoUpgrade": [
                4
            ],
            "availablePackages": [
                277
            ],
            "canBeUninstalled": [
                4
            ],
            "commandMenuItems": [
                144
            ],
            "createdAt": [
                197
            ],
            "defaultLogicFunctionRole": [
                404
            ],
            "defaultRoleId": [
                1
            ],
            "description": [
                1
            ],
            "frontComponents": [
                252
            ],
            "healthCheckLogicFunctionId": [
                471
            ],
            "id": [
                471
            ],
            "isUninstallBlockedByOtherWorkspaceInstallations": [
                4
            ],
            "logicFunctions": [
                290
            ],
            "logoFileId": [
                471
            ],
            "logoUrl": [
                1
            ],
            "name": [
                1
            ],
            "objects": [
                335
            ],
            "packageJsonChecksum": [
                1
            ],
            "packageJsonFileId": [
                471
            ],
            "settingsCustomTabFrontComponentId": [
                471
            ],
            "settingsMenuItems": [
                433
            ],
            "universalIdentifier": [
                1
            ],
            "version": [
                1
            ],
            "yarnLockChecksum": [
                1
            ],
            "yarnLockFileId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "ApplicationAuthorization": {
            "applicationId": [
                471
            ],
            "applicationName": [
                1
            ],
            "applicationUniversalIdentifier": [
                1
            ],
            "createdAt": [
                197
            ],
            "id": [
                471
            ],
            "lastAuthorizedAt": [
                197
            ],
            "lastUsedAt": [
                197
            ],
            "scopes": [
                1
            ],
            "workspaceId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "ApplicationCapabilityGrant": {
            "grantedCapabilities": [
                1
            ],
            "id": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "ApplicationConnectedAccountDTO": {
            "applicationId": [
                471
            ],
            "archivedAt": [
                197
            ],
            "authFailedAt": [
                197
            ],
            "authFailedReason": [
                1
            ],
            "connectionParameters": [
                378
            ],
            "connectionProviderId": [
                471
            ],
            "createdAt": [
                197
            ],
            "handle": [
                1
            ],
            "handleAliases": [
                1
            ],
            "id": [
                471
            ],
            "isOwnedByCurrentUser": [
                4
            ],
            "lastCredentialsRefreshedAt": [
                197
            ],
            "lastSignedInAt": [
                197
            ],
            "name": [
                1
            ],
            "provider": [
                1
            ],
            "scope": [
                149
            ],
            "scopes": [
                1
            ],
            "updatedAt": [
                197
            ],
            "userWorkspaceId": [
                471
            ],
            "visibility": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ApplicationConnectionProvider": {
            "applicationId": [
                1
            ],
            "displayName": [
                1
            ],
            "id": [
                471
            ],
            "logoUrl": [
                1
            ],
            "name": [
                1
            ],
            "oauth": [
                51
            ],
            "scope": [
                153
            ],
            "type": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ApplicationConnectionProviderOAuthConfig": {
            "isClientCredentialsConfigured": [
                4
            ],
            "scopes": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ApplicationExport": {
            "application": [
                53
            ],
            "coverage": [
                54
            ],
            "files": [
                56
            ],
            "manifest": [
                277
            ],
            "__typename": [
                1
            ]
        },
        "ApplicationExportApplication": {
            "displayName": [
                1
            ],
            "sourceType": [
                66
            ],
            "universalIdentifier": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ApplicationExportCoverageEntry": {
            "metadataName": [
                1
            ],
            "reason": [
                1
            ],
            "status": [
                55
            ],
            "universalIdentifier": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ApplicationExportCoverageStatus": {},
        "ApplicationExportFile": {
            "content": [
                1
            ],
            "folder": [
                1
            ],
            "path": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ApplicationFileCompletionError": {
            "fileId": [
                471
            ],
            "message": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ApplicationFileUploadError": {
            "fileFolder": [
                247
            ],
            "filePath": [
                1
            ],
            "message": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ApplicationFileUploadRequestInput": {
            "fileFolder": [
                247
            ],
            "filePath": [
                1
            ],
            "size": [
                10
            ],
            "__typename": [
                1
            ]
        },
        "ApplicationFileUploadTarget": {
            "contentType": [
                1
            ],
            "expiresAt": [
                197
            ],
            "fileFolder": [
                247
            ],
            "fileId": [
                471
            ],
            "filePath": [
                1
            ],
            "uploadUrl": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ApplicationHealthCheckAction": {
            "label": [
                1
            ],
            "location": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ApplicationHealthCheckResult": {
            "action": [
                61
            ],
            "description": [
                1
            ],
            "status": [
                63
            ],
            "title": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ApplicationHealthStatus": {},
        "ApplicationPreferences": {
            "applicationId": [
                471
            ],
            "connectionProviders": [
                50
            ],
            "settingsMenuItems": [
                433
            ],
            "variables": [
                566
            ],
            "__typename": [
                1
            ]
        },
        "ApplicationRegistration": {
            "createdAt": [
                197
            ],
            "galleryImagesUrls": [
                1
            ],
            "id": [
                471
            ],
            "isConfigured": [
                4
            ],
            "isListed": [
                4
            ],
            "isPreInstalled": [
                4
            ],
            "latestAvailableVersion": [
                1
            ],
            "logoUrl": [
                1
            ],
            "name": [
                1
            ],
            "oAuthClientId": [
                1
            ],
            "oAuthRedirectUris": [
                1
            ],
            "oAuthScopes": [
                1
            ],
            "ownerWorkspaceId": [
                471
            ],
            "sourcePackage": [
                1
            ],
            "sourceType": [
                66
            ],
            "universalIdentifier": [
                1
            ],
            "updatedAt": [
                197
            ],
            "__typename": [
                1
            ]
        },
        "ApplicationRegistrationSourceType": {},
        "ApplicationRegistrationStats": {
            "activeInstalls": [
                10
            ],
            "autoUpdateEnabled": [
                10
            ],
            "creditsUsedBreakdown": [
                194
            ],
            "mostInstalledVersion": [
                1
            ],
            "suspendedInstalls": [
                10
            ],
            "totalCreditsUsed": [
                6
            ],
            "versionDistribution": [
                575
            ],
            "__typename": [
                1
            ]
        },
        "ApplicationRegistrationSummary": {
            "id": [
                471
            ],
            "latestAvailableVersion": [
                1
            ],
            "logoUrl": [
                1
            ],
            "sourceType": [
                66
            ],
            "__typename": [
                1
            ]
        },
        "ApplicationRegistrationVariable": {
            "createdAt": [
                197
            ],
            "description": [
                1
            ],
            "id": [
                471
            ],
            "isDeprecated": [
                4
            ],
            "isFilled": [
                4
            ],
            "isRequired": [
                4
            ],
            "isSecret": [
                4
            ],
            "key": [
                1
            ],
            "options": [
                277
            ],
            "type": [
                1
            ],
            "updatedAt": [
                197
            ],
            "value": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ApplicationTokenPair": {
            "applicationAccessToken": [
                76
            ],
            "applicationRefreshToken": [
                76
            ],
            "__typename": [
                1
            ]
        },
        "ApplicationVariable": {
            "description": [
                1
            ],
            "id": [
                471
            ],
            "isDeprecated": [
                4
            ],
            "isRequired": [
                4
            ],
            "isSecret": [
                4
            ],
            "key": [
                1
            ],
            "label": [
                1
            ],
            "options": [
                277
            ],
            "scope": [
                72
            ],
            "type": [
                1
            ],
            "value": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ApplicationVariableScope": {},
        "ApprovedAccessDomain": {
            "createdAt": [
                197
            ],
            "domain": [
                1
            ],
            "id": [
                471
            ],
            "isValidated": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "AuthBypassProviders": {
            "google": [
                4
            ],
            "microsoft": [
                4
            ],
            "password": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "AuthProviders": {
            "google": [
                4
            ],
            "magicLink": [
                4
            ],
            "microsoft": [
                4
            ],
            "password": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "AuthToken": {
            "expiresAt": [
                197
            ],
            "token": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "AuthTokenPair": {
            "accessOrWorkspaceAgnosticToken": [
                76
            ],
            "refreshToken": [
                76
            ],
            "__typename": [
                1
            ]
        },
        "AuthTokens": {
            "tokens": [
                77
            ],
            "__typename": [
                1
            ]
        },
        "AuthorizeApp": {
            "redirectUrl": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "AutocompleteResult": {
            "placeId": [
                1
            ],
            "text": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "AvailableWorkspace": {
            "displayName": [
                1
            ],
            "id": [
                471
            ],
            "inviteHash": [
                1
            ],
            "loginToken": [
                1
            ],
            "logo": [
                1
            ],
            "personalInviteToken": [
                1
            ],
            "workspaceUrls": [
                616
            ],
            "__typename": [
                1
            ]
        },
        "AvailableWorkspaces": {
            "availableWorkspacesForSignIn": [
                81
            ],
            "availableWorkspacesForSignUp": [
                81
            ],
            "__typename": [
                1
            ]
        },
        "AvailableWorkspacesAndAccessTokens": {
            "availableWorkspaces": [
                82
            ],
            "tokens": [
                77
            ],
            "__typename": [
                1
            ]
        },
        "AxisNameDisplay": {},
        "BarChartConfiguration": {
            "aggregateFieldMetadataId": [
                471
            ],
            "aggregateOperation": [
                27
            ],
            "axisNameDisplay": [
                84
            ],
            "color": [
                1
            ],
            "configurationType": [
                594
            ],
            "description": [
                1
            ],
            "displayDataLabel": [
                4
            ],
            "displayLegend": [
                4
            ],
            "filter": [
                277
            ],
            "firstDayOfTheWeek": [
                10
            ],
            "groupMode": [
                88
            ],
            "isCumulative": [
                4
            ],
            "layout": [
                89
            ],
            "numberFormat": [
                131
            ],
            "omitNullValues": [
                4
            ],
            "primaryAxisDateGranularity": [
                349
            ],
            "primaryAxisGroupByFieldMetadataId": [
                471
            ],
            "primaryAxisGroupBySubFieldName": [
                1
            ],
            "primaryAxisManualSortOrder": [
                1
            ],
            "primaryAxisOrderBy": [
                258
            ],
            "rangeMax": [
                6
            ],
            "rangeMin": [
                6
            ],
            "secondaryAxisGroupByDateGranularity": [
                349
            ],
            "secondaryAxisGroupByFieldMetadataId": [
                471
            ],
            "secondaryAxisGroupBySubFieldName": [
                1
            ],
            "secondaryAxisManualSortOrder": [
                1
            ],
            "secondaryAxisOrderBy": [
                258
            ],
            "splitMultiValueFields": [
                4
            ],
            "timezone": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "BarChartData": {
            "data": [
                277
            ],
            "formattedToRawLookup": [
                277
            ],
            "groupMode": [
                88
            ],
            "hasTooManyGroups": [
                4
            ],
            "indexBy": [
                1
            ],
            "keys": [
                1
            ],
            "layout": [
                89
            ],
            "series": [
                90
            ],
            "showDataLabels": [
                4
            ],
            "showLegend": [
                4
            ],
            "xAxisLabel": [
                1
            ],
            "yAxisLabel": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "BarChartDataInput": {
            "configuration": [
                277
            ],
            "objectMetadataId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "BarChartGroupMode": {},
        "BarChartLayout": {},
        "BarChartSeries": {
            "key": [
                1
            ],
            "label": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "BigInt": {},
        "Billing": {
            "billingUrl": [
                1
            ],
            "isBillingEnabled": [
                4
            ],
            "stripePublishableKey": [
                1
            ],
            "trialPeriods": [
                116
            ],
            "__typename": [
                1
            ]
        },
        "BillingCustomer": {
            "hasPaymentMethod": [
                4
            ],
            "id": [
                471
            ],
            "userCreditsFallback": [
                567
            ],
            "__typename": [
                1
            ]
        },
        "BillingEndTrialPeriod": {
            "billingPortalUrl": [
                1
            ],
            "billingSubscriptions": [
                111
            ],
            "currentBillingSubscription": [
                111
            ],
            "hasPaymentMethod": [
                4
            ],
            "status": [
                444
            ],
            "__typename": [
                1
            ]
        },
        "BillingEntitlement": {
            "key": [
                96
            ],
            "value": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "BillingEntitlementKey": {},
        "BillingLicensedProduct": {
            "description": [
                1
            ],
            "images": [
                1
            ],
            "metadata": [
                108
            ],
            "name": [
                1
            ],
            "prices": [
                102
            ],
            "__typename": [
                1
            ]
        },
        "BillingMeteredProduct": {
            "description": [
                1
            ],
            "images": [
                1
            ],
            "metadata": [
                108
            ],
            "name": [
                1
            ],
            "prices": [
                103
            ],
            "__typename": [
                1
            ]
        },
        "BillingPaymentIntent": {
            "clientSecret": [
                1
            ],
            "paymentIntentType": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "BillingPlan": {
            "baseProducts": [
                97
            ],
            "downgradePlanKeys": [
                101
            ],
            "isCheckoutDefault": [
                4
            ],
            "isSellable": [
                4
            ],
            "meteredProducts": [
                98
            ],
            "planKey": [
                101
            ],
            "resourceCreditProducts": [
                97
            ],
            "upgradePlanKeys": [
                101
            ],
            "__typename": [
                1
            ]
        },
        "BillingPlanKey": {},
        "BillingPriceLicensed": {
            "creditAmount": [
                6
            ],
            "isSellable": [
                4
            ],
            "priceUsageType": [
                118
            ],
            "recurringInterval": [
                443
            ],
            "stripePriceId": [
                1
            ],
            "unitAmount": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "BillingPriceMetered": {
            "priceUsageType": [
                118
            ],
            "recurringInterval": [
                443
            ],
            "stripePriceId": [
                1
            ],
            "tiers": [
                104
            ],
            "__typename": [
                1
            ]
        },
        "BillingPriceTier": {
            "flatAmount": [
                6
            ],
            "unitAmount": [
                6
            ],
            "upTo": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "BillingProduct": {
            "description": [
                1
            ],
            "images": [
                1
            ],
            "metadata": [
                108
            ],
            "name": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "BillingProductDTO": {
            "description": [
                1
            ],
            "images": [
                1
            ],
            "metadata": [
                108
            ],
            "name": [
                1
            ],
            "on_BillingLicensedProduct": [
                97
            ],
            "on_BillingMeteredProduct": [
                98
            ],
            "__typename": [
                1
            ]
        },
        "BillingProductKey": {},
        "BillingProductMetadata": {
            "isLegacy": [
                1
            ],
            "planKey": [
                101
            ],
            "priceUsageBased": [
                118
            ],
            "productKey": [
                107
            ],
            "__typename": [
                1
            ]
        },
        "BillingResourceCreditUsage": {
            "periodEnd": [
                197
            ],
            "periodStart": [
                197
            ],
            "productKey": [
                107
            ],
            "unitPriceCents": [
                6
            ],
            "userCreditsUsed": [
                6
            ],
            "workspaceCreditsExtraGranted": [
                6
            ],
            "workspaceCreditsGranted": [
                6
            ],
            "workspaceCreditsGrantedForSeats": [
                6
            ],
            "workspaceCreditsSeats": [
                10
            ],
            "workspaceCreditsTotalGranted": [
                6
            ],
            "workspaceCreditsUsed": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "BillingSession": {
            "url": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "BillingSubscription": {
            "billingSubscriptionItems": [
                113
            ],
            "cancelAt": [
                197
            ],
            "collectionMethod": [
                112
            ],
            "currentPeriodEnd": [
                197
            ],
            "hasUserCredits": [
                4
            ],
            "id": [
                471
            ],
            "interval": [
                443
            ],
            "metadata": [
                277
            ],
            "phases": [
                114
            ],
            "status": [
                444
            ],
            "__typename": [
                1
            ]
        },
        "BillingSubscriptionCollectionMethod": {},
        "BillingSubscriptionItem": {
            "billingProduct": [
                106
            ],
            "creditAmount": [
                6
            ],
            "hasReachedCurrentPeriodCap": [
                4
            ],
            "id": [
                471
            ],
            "quantity": [
                6
            ],
            "stripePriceId": [
                1
            ],
            "unitAmount": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "BillingSubscriptionSchedulePhase": {
            "end_date": [
                6
            ],
            "items": [
                115
            ],
            "start_date": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "BillingSubscriptionSchedulePhaseItem": {
            "price": [
                1
            ],
            "quantity": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "BillingTrialPeriod": {
            "duration": [
                6
            ],
            "isCreditCardRequired": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "BillingUpdate": {
            "billingSubscriptions": [
                111
            ],
            "currentBillingSubscription": [
                111
            ],
            "__typename": [
                1
            ]
        },
        "BillingUsageType": {},
        "BooleanFieldComparison": {
            "is": [
                4
            ],
            "isNot": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "CalendarChannel": {
            "connectedAccountId": [
                471
            ],
            "contactAutoCreationPolicy": [
                121
            ],
            "createdAt": [
                197
            ],
            "excludePrivateEvents": [
                4
            ],
            "handle": [
                1
            ],
            "id": [
                471
            ],
            "isContactAutoCreationEnabled": [
                4
            ],
            "isSyncEnabled": [
                4
            ],
            "syncStage": [
                122
            ],
            "syncStageStartedAt": [
                197
            ],
            "syncStatus": [
                123
            ],
            "syncedAt": [
                197
            ],
            "throttleFailureCount": [
                6
            ],
            "updatedAt": [
                197
            ],
            "visibility": [
                124
            ],
            "__typename": [
                1
            ]
        },
        "CalendarChannelContactAutoCreationPolicy": {},
        "CalendarChannelSyncStage": {},
        "CalendarChannelSyncStatus": {},
        "CalendarChannelVisibility": {},
        "CalendarConfiguration": {
            "configurationType": [
                594
            ],
            "__typename": [
                1
            ]
        },
        "CallRecordingSummaryConfiguration": {
            "configurationType": [
                594
            ],
            "__typename": [
                1
            ]
        },
        "CallRecordingTranscriptConfiguration": {
            "configurationType": [
                594
            ],
            "__typename": [
                1
            ]
        },
        "Captcha": {
            "provider": [
                129
            ],
            "siteKey": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "CaptchaDriverType": {},
        "ChannelSyncSuccess": {
            "success": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "ChartNumberFormat": {},
        "ChatConfiguration": {
            "configurationType": [
                594
            ],
            "__typename": [
                1
            ]
        },
        "ChatStreamCatchupChunks": {
            "chunks": [
                277
            ],
            "error": [
                134
            ],
            "maxSeq": [
                10
            ],
            "__typename": [
                1
            ]
        },
        "ChatStreamError": {
            "code": [
                1
            ],
            "message": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ChatThreadsConfiguration": {
            "configurationType": [
                594
            ],
            "__typename": [
                1
            ]
        },
        "CheckUserExist": {
            "availableWorkspacesCount": [
                6
            ],
            "exists": [
                4
            ],
            "isEmailVerified": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "ClaimableApplicationRegistration": {
            "author": [
                1
            ],
            "description": [
                1
            ],
            "id": [
                1
            ],
            "isOwned": [
                4
            ],
            "logoUrl": [
                1
            ],
            "name": [
                1
            ],
            "sourcePackage": [
                1
            ],
            "universalIdentifier": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ClientAiEvaluationModelConfig": {
            "description": [
                1
            ],
            "inputCostPerMillionTokens": [
                6
            ],
            "isAvailable": [
                4
            ],
            "isDeprecated": [
                4
            ],
            "label": [
                1
            ],
            "maxCriteriaPerQuestion": [
                6
            ],
            "maxScoreLevels": [
                6
            ],
            "medianLatencyMs": [
                6
            ],
            "modelId": [
                1
            ],
            "outputCostPerMillionTokens": [
                6
            ],
            "providerLabel": [
                1
            ],
            "supportedQuestionTypes": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ClientAiModelConfig": {
            "contextWindowTokens": [
                6
            ],
            "costPerTask": [
                6
            ],
            "dataResidency": [
                1
            ],
            "effort": [
                1
            ],
            "efforts": [
                1
            ],
            "inputCostPerMillionTokens": [
                6
            ],
            "intelligenceIndex": [
                6
            ],
            "isBenchmarkInherited": [
                4
            ],
            "isDeprecated": [
                4
            ],
            "label": [
                1
            ],
            "maxOutputTokens": [
                6
            ],
            "modelFamily": [
                329
            ],
            "modelFamilyLabel": [
                1
            ],
            "modelId": [
                1
            ],
            "nativeCapabilities": [
                331
            ],
            "outputCostPerMillionTokens": [
                6
            ],
            "outputTokensPerSecond": [
                6
            ],
            "providerLabel": [
                1
            ],
            "providerName": [
                1
            ],
            "sdkPackage": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ClientAiModelTierConfig": {
            "modelId": [
                1
            ],
            "tier": [
                30
            ],
            "__typename": [
                1
            ]
        },
        "ClientConfig": {
            "aiEvaluationModels": [
                138
            ],
            "aiModelTiers": [
                140
            ],
            "aiModels": [
                139
            ],
            "allowRequestsToTwentyIcons": [
                4
            ],
            "analyticsEnabled": [
                4
            ],
            "api": [
                36
            ],
            "appVersion": [
                1
            ],
            "authProviders": [
                75
            ],
            "billing": [
                92
            ],
            "calendarBookingPageId": [
                1
            ],
            "canManageFeatureFlags": [
                4
            ],
            "captcha": [
                128
            ],
            "defaultSubdomain": [
                1
            ],
            "enterpriseInstanceType": [
                1
            ],
            "frontDomain": [
                1
            ],
            "isAttachmentPreviewEnabled": [
                4
            ],
            "isBookCallOnboardingStepEnabled": [
                4
            ],
            "isClickHouseConfigured": [
                4
            ],
            "isCompanyEnrichmentEnabled": [
                4
            ],
            "isConfigVariablesInDbEnabled": [
                4
            ],
            "isCookieSessionEnabled": [
                4
            ],
            "isEmailVerificationRequired": [
                4
            ],
            "isGoogleCalendarEnabled": [
                4
            ],
            "isGoogleMessagingEnabled": [
                4
            ],
            "isImapSmtpCaldavEnabled": [
                4
            ],
            "isMicrosoftCalendarEnabled": [
                4
            ],
            "isMicrosoftMessagingEnabled": [
                4
            ],
            "isMultiWorkspaceEnabled": [
                4
            ],
            "isOnboardingAiChatEnabled": [
                4
            ],
            "isWorkspaceSchemaDDLLocked": [
                4
            ],
            "maintenance": [
                142
            ],
            "publicFeatureFlags": [
                376
            ],
            "publicFunctionDomain": [
                1
            ],
            "sentry": [
                431
            ],
            "serverUrl": [
                1
            ],
            "signInPrefilled": [
                4
            ],
            "support": [
                445
            ],
            "__typename": [
                1
            ]
        },
        "ClientConfigMaintenanceMode": {
            "endAt": [
                197
            ],
            "link": [
                1
            ],
            "startAt": [
                197
            ],
            "__typename": [
                1
            ]
        },
        "CollectionHash": {
            "collectionName": [
                33
            ],
            "hash": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "CommandMenuItem": {
            "applicationId": [
                471
            ],
            "availabilityObjectMetadataId": [
                471
            ],
            "availabilityType": [
                145
            ],
            "conditionalAvailabilityExpression": [
                1
            ],
            "conditionalPinnedExpression": [
                1
            ],
            "coreWorkflowVersionId": [
                471
            ],
            "createdAt": [
                197
            ],
            "engineComponentKey": [
                222
            ],
            "frontComponent": [
                252
            ],
            "frontComponentId": [
                471
            ],
            "hotKeys": [
                1
            ],
            "icon": [
                1
            ],
            "id": [
                471
            ],
            "isActive": [
                4
            ],
            "isPinned": [
                4
            ],
            "label": [
                1
            ],
            "navigationTargetObjectMetadataId": [
                471
            ],
            "pageLayoutId": [
                471
            ],
            "payload": [
                146
            ],
            "position": [
                6
            ],
            "shortLabel": [
                1
            ],
            "universalIdentifier": [
                471
            ],
            "updatedAt": [
                197
            ],
            "workflowVersionId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "CommandMenuItemAvailabilityType": {},
        "CommandMenuItemPayload": {
            "on_ObjectMetadataCommandMenuItemPayload": [
                341
            ],
            "on_PathCommandMenuItemPayload": [
                366
            ],
            "__typename": [
                1
            ]
        },
        "CompleteApplicationFileUploadsResult": {
            "errors": [
                57
            ],
            "files": [
                245
            ],
            "__typename": [
                1
            ]
        },
        "ConnectedAccountPublicDTO": {
            "applicationId": [
                471
            ],
            "archivedAt": [
                197
            ],
            "authFailedAt": [
                197
            ],
            "authFailedReason": [
                1
            ],
            "connectionParameters": [
                378
            ],
            "connectionProviderId": [
                471
            ],
            "createdAt": [
                197
            ],
            "handle": [
                1
            ],
            "handleAliases": [
                1
            ],
            "id": [
                471
            ],
            "lastCredentialsRefreshedAt": [
                197
            ],
            "lastSignedInAt": [
                197
            ],
            "name": [
                1
            ],
            "provider": [
                1
            ],
            "scope": [
                149
            ],
            "scopes": [
                1
            ],
            "updatedAt": [
                197
            ],
            "userWorkspaceId": [
                471
            ],
            "visibility": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ConnectedAccountScope": {},
        "ConnectedImapSmtpCaldavAccount": {
            "connectionParameters": [
                262
            ],
            "handle": [
                1
            ],
            "id": [
                471
            ],
            "provider": [
                1
            ],
            "userWorkspaceId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "ConnectionCursor": {},
        "ConnectionParametersInput": {
            "connectionSecurity": [
                218
            ],
            "host": [
                1
            ],
            "password": [
                1
            ],
            "port": [
                6
            ],
            "username": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ConnectionProviderScope": {},
        "CreateAgentChatChannelInput": {
            "color": [
                1
            ],
            "icon": [
                1
            ],
            "name": [
                1
            ],
            "roleIds": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "CreateAgentInput": {
            "description": [
                1
            ],
            "icon": [
                1
            ],
            "label": [
                1
            ],
            "modelConfiguration": [
                277
            ],
            "modelId": [
                1
            ],
            "name": [
                1
            ],
            "prompt": [
                1
            ],
            "responseFormat": [
                277
            ],
            "roleId": [
                471
            ],
            "triggers": [
                277
            ],
            "__typename": [
                1
            ]
        },
        "CreateApiKeyInput": {
            "expiresAt": [
                1
            ],
            "name": [
                1
            ],
            "revokedAt": [
                1
            ],
            "roleId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "CreateAppMessageChannelInput": {
            "connectedAccountId": [
                471
            ],
            "displayName": [
                1
            ],
            "handle": [
                1
            ],
            "messagingProviderUniversalIdentifier": [
                471
            ],
            "participantHandleFieldUniversalIdentifier": [
                471
            ],
            "visibility": [
                313
            ],
            "__typename": [
                1
            ]
        },
        "CreateApplicationFileUploadsResult": {
            "errors": [
                58
            ],
            "targets": [
                60
            ],
            "__typename": [
                1
            ]
        },
        "CreateApplicationRegistration": {
            "applicationRegistration": [
                65
            ],
            "clientSecret": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "CreateApplicationRegistrationInput": {
            "name": [
                1
            ],
            "oAuthRedirectUris": [
                1
            ],
            "oAuthScopes": [
                1
            ],
            "universalIdentifier": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "CreateApprovedAccessDomainInput": {
            "domain": [
                1
            ],
            "email": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "CreateCalendarEventInput": {
            "addConferencing": [
                4
            ],
            "attendees": [
                1
            ],
            "connectedAccountId": [
                1
            ],
            "description": [
                1
            ],
            "endsAt": [
                1
            ],
            "isFullDay": [
                4
            ],
            "location": [
                1
            ],
            "sendInvitations": [
                4
            ],
            "startsAt": [
                1
            ],
            "timeZone": [
                1
            ],
            "title": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "CreateCalendarEventOutput": {
            "calendarEventId": [
                1
            ],
            "conferenceLink": [
                1
            ],
            "error": [
                1
            ],
            "iCalUid": [
                1
            ],
            "success": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "CreateCommandMenuItemInput": {
            "availabilityObjectMetadataId": [
                471
            ],
            "availabilityType": [
                145
            ],
            "conditionalAvailabilityExpression": [
                1
            ],
            "conditionalPinnedExpression": [
                1
            ],
            "coreWorkflowVersionId": [
                471
            ],
            "engineComponentKey": [
                222
            ],
            "frontComponentId": [
                471
            ],
            "hotKeys": [
                1
            ],
            "icon": [
                1
            ],
            "isPinned": [
                4
            ],
            "label": [
                1
            ],
            "navigationTargetObjectMetadataId": [
                471
            ],
            "pageLayoutId": [
                471
            ],
            "payload": [
                277
            ],
            "position": [
                6
            ],
            "shortLabel": [
                1
            ],
            "workflowVersionId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "CreateEmailGroupChannelInput": {
            "displayName": [
                1
            ],
            "handle": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "CreateEmailGroupChannelOutput": {
            "forwardingAddress": [
                1
            ],
            "messageChannel": [
                307
            ],
            "__typename": [
                1
            ]
        },
        "CreateFieldInput": {
            "defaultValue": [
                277
            ],
            "description": [
                1
            ],
            "icon": [
                1
            ],
            "isActive": [
                4
            ],
            "isAuditLogged": [
                4
            ],
            "isLabelSyncedWithName": [
                4
            ],
            "isNullable": [
                4
            ],
            "isRemoteCreation": [
                4
            ],
            "isSearchable": [
                4
            ],
            "isSystem": [
                4
            ],
            "isUIEditable": [
                4
            ],
            "isUIReadOnly": [
                4
            ],
            "isUnique": [
                4
            ],
            "label": [
                1
            ],
            "morphRelationsCreationPayload": [
                277
            ],
            "name": [
                1
            ],
            "objectMetadataId": [
                471
            ],
            "options": [
                277
            ],
            "relationCreationPayload": [
                277
            ],
            "settings": [
                277
            ],
            "type": [
                240
            ],
            "__typename": [
                1
            ]
        },
        "CreateFrontComponentInput": {
            "builtComponentChecksum": [
                1
            ],
            "builtComponentPath": [
                1
            ],
            "componentName": [
                1
            ],
            "description": [
                1
            ],
            "id": [
                471
            ],
            "name": [
                1
            ],
            "sourceComponentPath": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "CreateIndexFieldInput": {
            "fieldMetadataId": [
                471
            ],
            "subFieldName": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "CreateIndexInput": {
            "fields": [
                169
            ],
            "indexType": [
                270
            ],
            "objectMetadataId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "CreateLogicFunctionFromSourceInput": {
            "cronTriggerSettings": [
                277
            ],
            "databaseEventTriggerSettings": [
                277
            ],
            "description": [
                1
            ],
            "httpRouteTriggerSettings": [
                277
            ],
            "id": [
                471
            ],
            "name": [
                1
            ],
            "serverRouteTriggerSettings": [
                277
            ],
            "source": [
                277
            ],
            "timeoutSeconds": [
                6
            ],
            "toolTriggerSettings": [
                277
            ],
            "universalIdentifier": [
                471
            ],
            "workflowActionTriggerSettings": [
                277
            ],
            "__typename": [
                1
            ]
        },
        "CreateMcpServerInput": {
            "connectionProviderId": [
                471
            ],
            "id": [
                471
            ],
            "isActive": [
                4
            ],
            "label": [
                1
            ],
            "name": [
                1
            ],
            "url": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "CreateNavigationMenuItemInput": {
            "agentChatChannelId": [
                471
            ],
            "color": [
                1
            ],
            "folderId": [
                471
            ],
            "icon": [
                1
            ],
            "id": [
                471
            ],
            "link": [
                1
            ],
            "name": [
                1
            ],
            "pageLayoutId": [
                471
            ],
            "position": [
                6
            ],
            "targetObjectMetadataId": [
                471
            ],
            "targetRecordId": [
                471
            ],
            "type": [
                333
            ],
            "userWorkspaceId": [
                471
            ],
            "viewId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "CreateObjectInput": {
            "color": [
                1
            ],
            "description": [
                1
            ],
            "icon": [
                1
            ],
            "isLabelSyncedWithName": [
                4
            ],
            "isRemote": [
                4
            ],
            "labelPlural": [
                1
            ],
            "labelSingular": [
                1
            ],
            "namePlural": [
                1
            ],
            "nameSingular": [
                1
            ],
            "primaryKeyColumnType": [
                1
            ],
            "primaryKeyFieldMetadataSettings": [
                277
            ],
            "shortcut": [
                1
            ],
            "skipNameField": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "CreateOneFieldMetadataInput": {
            "field": [
                167
            ],
            "__typename": [
                1
            ]
        },
        "CreateOneIndexInput": {
            "index": [
                170
            ],
            "__typename": [
                1
            ]
        },
        "CreateOneObjectInput": {
            "object": [
                174
            ],
            "__typename": [
                1
            ]
        },
        "CreatePageLayoutInput": {
            "name": [
                1
            ],
            "objectMetadataId": [
                471
            ],
            "type": [
                359
            ],
            "__typename": [
                1
            ]
        },
        "CreatePageLayoutTabInput": {
            "layoutMode": [
                358
            ],
            "pageLayoutId": [
                471
            ],
            "position": [
                6
            ],
            "title": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "CreatePageLayoutWidgetInput": {
            "configuration": [
                277
            ],
            "objectMetadataId": [
                471
            ],
            "pageLayoutTabId": [
                471
            ],
            "position": [
                277
            ],
            "title": [
                1
            ],
            "type": [
                595
            ],
            "__typename": [
                1
            ]
        },
        "CreateRecordExportInput": {
            "fieldMetadataIds": [
                471
            ],
            "filter": [
                277
            ],
            "objectMetadataId": [
                471
            ],
            "orderBy": [
                277
            ],
            "__typename": [
                1
            ]
        },
        "CreateRoleInput": {
            "canAccessAllAgentChatChannels": [
                4
            ],
            "canAccessAllTools": [
                4
            ],
            "canBeAssignedToAgents": [
                4
            ],
            "canBeAssignedToApiKeys": [
                4
            ],
            "canBeAssignedToUsers": [
                4
            ],
            "canDestroyAllObjectRecords": [
                4
            ],
            "canReadAllObjectRecords": [
                4
            ],
            "canSoftDeleteAllObjectRecords": [
                4
            ],
            "canUpdateAllObjectRecords": [
                4
            ],
            "canUpdateAllSettings": [
                4
            ],
            "description": [
                1
            ],
            "icon": [
                1
            ],
            "id": [
                1
            ],
            "label": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "CreateSkillInput": {
            "content": [
                1
            ],
            "description": [
                1
            ],
            "icon": [
                1
            ],
            "id": [
                471
            ],
            "label": [
                1
            ],
            "name": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "CreateUsageLimitInput": {
            "burstValue": [
                91
            ],
            "limitKind": [
                1
            ],
            "limitValue": [
                91
            ],
            "operationType": [
                554
            ],
            "periodCount": [
                10
            ],
            "periodUnit": [
                1
            ],
            "resourceType": [
                561
            ],
            "spenderId": [
                1
            ],
            "spenderType": [
                1
            ],
            "unit": [
                563
            ],
            "__typename": [
                1
            ]
        },
        "CreateValidationRuleInput": {
            "description": [
                1
            ],
            "errorFieldMetadataId": [
                471
            ],
            "expression": [
                1
            ],
            "icon": [
                1
            ],
            "isActive": [
                4
            ],
            "message": [
                1
            ],
            "name": [
                1
            ],
            "objectMetadataId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "CreateViewFieldGroupInput": {
            "id": [
                471
            ],
            "isVisible": [
                4
            ],
            "name": [
                1
            ],
            "position": [
                6
            ],
            "viewId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "CreateViewFieldInput": {
            "aggregateOperation": [
                27
            ],
            "fieldMetadataId": [
                471
            ],
            "id": [
                471
            ],
            "isVisible": [
                4
            ],
            "position": [
                6
            ],
            "size": [
                6
            ],
            "viewFieldGroupId": [
                471
            ],
            "viewId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "CreateViewFilterGroupInput": {
            "id": [
                471
            ],
            "logicalOperator": [
                583
            ],
            "parentViewFilterGroupId": [
                471
            ],
            "positionInViewFilterGroup": [
                6
            ],
            "viewId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "CreateViewFilterInput": {
            "fieldMetadataId": [
                471
            ],
            "id": [
                471
            ],
            "operand": [
                584
            ],
            "positionInViewFilterGroup": [
                6
            ],
            "relationTargetFieldMetadataId": [
                471
            ],
            "subFieldName": [
                1
            ],
            "value": [
                277
            ],
            "viewFilterGroupId": [
                471
            ],
            "viewId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "CreateViewGroupInput": {
            "fieldValue": [
                1
            ],
            "id": [
                471
            ],
            "isVisible": [
                4
            ],
            "position": [
                6
            ],
            "viewId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "CreateViewInput": {
            "anyFieldFilterValue": [
                1
            ],
            "calendarEndFieldMetadataId": [
                471
            ],
            "calendarFieldMetadataId": [
                471
            ],
            "calendarLayout": [
                577
            ],
            "groupLoadLimit": [
                10
            ],
            "icon": [
                1
            ],
            "id": [
                471
            ],
            "isCompact": [
                4
            ],
            "kanbanAggregateOperation": [
                27
            ],
            "kanbanAggregateOperationFieldMetadataId": [
                471
            ],
            "kanbanColumnWidth": [
                10
            ],
            "key": [
                586
            ],
            "mainGroupByFieldMetadataId": [
                471
            ],
            "name": [
                1
            ],
            "objectMetadataId": [
                471
            ],
            "openRecordIn": [
                587
            ],
            "position": [
                6
            ],
            "shouldHideEmptyGroups": [
                4
            ],
            "type": [
                590
            ],
            "visibility": [
                591
            ],
            "__typename": [
                1
            ]
        },
        "CreateViewSortInput": {
            "direction": [
                589
            ],
            "fieldMetadataId": [
                471
            ],
            "id": [
                471
            ],
            "subFieldName": [
                1
            ],
            "viewId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "CreateWebhookInput": {
            "description": [
                1
            ],
            "id": [
                471
            ],
            "operations": [
                1
            ],
            "secret": [
                1
            ],
            "targetUrl": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "CreditUsedItem": {
            "creditsUsed": [
                6
            ],
            "label": [
                1
            ],
            "operation": [
                554
            ],
            "resource": [
                561
            ],
            "__typename": [
                1
            ]
        },
        "CursorPaging": {
            "after": [
                151
            ],
            "before": [
                151
            ],
            "first": [
                10
            ],
            "last": [
                10
            ],
            "__typename": [
                1
            ]
        },
        "DatabaseEventAction": {},
        "DateTime": {},
        "DeleteApprovedAccessDomainInput": {
            "id": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "DeleteOneFieldInput": {
            "id": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "DeleteOneIndexInput": {
            "id": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "DeleteOneObjectInput": {
            "id": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "DeleteTwoFactorAuthenticationMethod": {
            "success": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "DeleteViewFieldGroupInput": {
            "id": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "DeleteViewFieldInput": {
            "id": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "DeleteViewFilterInput": {
            "id": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "DeleteViewGroupInput": {
            "id": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "DeleteViewSortInput": {
            "id": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "DeletedWorkspaceMember": {
            "avatarUrl": [
                1
            ],
            "id": [
                471
            ],
            "name": [
                255
            ],
            "userEmail": [
                1
            ],
            "userWorkspaceId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "DestroyViewFieldGroupInput": {
            "id": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "DestroyViewFieldInput": {
            "id": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "DestroyViewFilterInput": {
            "id": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "DestroyViewGroupInput": {
            "id": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "DestroyViewSortInput": {
            "id": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "DevelopmentApplication": {
            "id": [
                1
            ],
            "universalIdentifier": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "DuplicatedDashboard": {
            "createdAt": [
                1
            ],
            "id": [
                471
            ],
            "pageLayoutId": [
                471
            ],
            "position": [
                6
            ],
            "title": [
                1
            ],
            "updatedAt": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "DuplicatedMessageList": {
            "createdAt": [
                1
            ],
            "description": [
                1
            ],
            "id": [
                471
            ],
            "memberCount": [
                6
            ],
            "name": [
                1
            ],
            "position": [
                6
            ],
            "updatedAt": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "EmailAccountConnectionParameters": {
            "CALDAV": [
                152
            ],
            "IMAP": [
                152
            ],
            "SMTP": [
                152
            ],
            "name": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "EmailConnectionSecurity": {},
        "EmailPasswordResetLink": {
            "success": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "EmailThreadConfiguration": {
            "configurationType": [
                594
            ],
            "__typename": [
                1
            ]
        },
        "EmailsConfiguration": {
            "configurationType": [
                594
            ],
            "__typename": [
                1
            ]
        },
        "EngineComponentKey": {},
        "EnqueueJobInput": {
            "delayMs": [
                10
            ],
            "jobId": [
                1
            ],
            "logicFunctionUniversalIdentifier": [
                1
            ],
            "payload": [
                277
            ],
            "retryLimit": [
                10
            ],
            "__typename": [
                1
            ]
        },
        "EnqueueJobItemInput": {
            "jobId": [
                1
            ],
            "payload": [
                277
            ],
            "__typename": [
                1
            ]
        },
        "EnqueueJobResult": {
            "enqueued": [
                4
            ],
            "jobId": [
                1
            ],
            "logicFunctionUniversalIdentifier": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "EnqueueJobsInput": {
            "delayMs": [
                10
            ],
            "jobs": [
                224
            ],
            "logicFunctionUniversalIdentifier": [
                1
            ],
            "payloads": [
                277
            ],
            "retryLimit": [
                10
            ],
            "__typename": [
                1
            ]
        },
        "EnqueueJobsResult": {
            "enqueued": [
                4
            ],
            "enqueuedJobsCount": [
                10
            ],
            "jobIds": [
                1
            ],
            "logicFunctionUniversalIdentifier": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "EnterpriseLicenseInfoDTO": {
            "expiresAt": [
                197
            ],
            "isValid": [
                4
            ],
            "licensee": [
                1
            ],
            "subscriptionId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "EnterpriseSubscriptionStatusDTO": {
            "cancelAt": [
                197
            ],
            "currentPeriodEnd": [
                197
            ],
            "expiresAt": [
                197
            ],
            "isCancellationScheduled": [
                4
            ],
            "licensee": [
                1
            ],
            "status": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "EventSubscription": {
            "eventStreamId": [
                1
            ],
            "metadataEvents": [
                318
            ],
            "objectRecordEventsWithQueryIds": [
                348
            ],
            "queueJobEvents": [
                280
            ],
            "__typename": [
                1
            ]
        },
        "ExecuteOneLogicFunctionInput": {
            "id": [
                471
            ],
            "payload": [
                277
            ],
            "__typename": [
                1
            ]
        },
        "FeatureFlag": {
            "key": [
                233
            ],
            "value": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "FeatureFlagKey": {},
        "Field": {
            "applicationId": [
                471
            ],
            "createdAt": [
                197
            ],
            "defaultValue": [
                277
            ],
            "description": [
                1
            ],
            "disabledFieldPermissionActions": [
                1
            ],
            "icon": [
                1
            ],
            "id": [
                471
            ],
            "isActive": [
                4
            ],
            "isAuditLogged": [
                4
            ],
            "isLabelSyncedWithName": [
                4
            ],
            "isNullable": [
                4
            ],
            "isSearchable": [
                4
            ],
            "isSystem": [
                4
            ],
            "isUIEditable": [
                4
            ],
            "isUIReadOnly": [
                4
            ],
            "isUnique": [
                4
            ],
            "label": [
                1
            ],
            "morphId": [
                471
            ],
            "morphRelations": [
                397
            ],
            "name": [
                1
            ],
            "object": [
                335
            ],
            "objectMetadataId": [
                471
            ],
            "options": [
                277
            ],
            "relation": [
                397
            ],
            "settings": [
                277
            ],
            "type": [
                240
            ],
            "universalIdentifier": [
                1
            ],
            "updatedAt": [
                197
            ],
            "writability": [
                325
            ],
            "__typename": [
                1
            ]
        },
        "FieldConfiguration": {
            "configurationType": [
                594
            ],
            "fieldDisplayMode": [
                237
            ],
            "fieldMetadataId": [
                1
            ],
            "isUIEditable": [
                4
            ],
            "nestedRelationFieldMetadataId": [
                1
            ],
            "viewId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "FieldConnection": {
            "edges": [
                238
            ],
            "pageInfo": [
                355
            ],
            "__typename": [
                1
            ]
        },
        "FieldDisplayMode": {},
        "FieldEdge": {
            "cursor": [
                151
            ],
            "node": [
                234
            ],
            "__typename": [
                1
            ]
        },
        "FieldFilter": {
            "and": [
                239
            ],
            "id": [
                472
            ],
            "isActive": [
                119
            ],
            "isSystem": [
                119
            ],
            "isUIEditable": [
                119
            ],
            "isUIReadOnly": [
                119
            ],
            "objectMetadataId": [
                472
            ],
            "or": [
                239
            ],
            "__typename": [
                1
            ]
        },
        "FieldMetadataType": {},
        "FieldPermission": {
            "canReadFieldValue": [
                4
            ],
            "canUpdateFieldValue": [
                4
            ],
            "fieldMetadataId": [
                471
            ],
            "id": [
                471
            ],
            "objectMetadataId": [
                471
            ],
            "roleId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "FieldPermissionInput": {
            "canReadFieldValue": [
                4
            ],
            "canUpdateFieldValue": [
                4
            ],
            "fieldMetadataId": [
                471
            ],
            "objectMetadataId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "FieldRichTextConfiguration": {
            "configurationType": [
                594
            ],
            "__typename": [
                1
            ]
        },
        "FieldsConfiguration": {
            "configurationType": [
                594
            ],
            "newFieldDefaultVisibility": [
                4
            ],
            "shouldAllowUserToSeeHiddenFields": [
                4
            ],
            "viewId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "File": {
            "createdAt": [
                197
            ],
            "id": [
                471
            ],
            "path": [
                1
            ],
            "size": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "FileAttachmentInput": {
            "filename": [
                1
            ],
            "id": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "FileFolder": {},
        "FileUploadTarget": {
            "contentType": [
                1
            ],
            "expiresAt": [
                197
            ],
            "fileId": [
                471
            ],
            "uploadUrl": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "FileWithSignedUrl": {
            "createdAt": [
                197
            ],
            "id": [
                471
            ],
            "path": [
                1
            ],
            "size": [
                6
            ],
            "url": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "FilesConfiguration": {
            "configurationType": [
                594
            ],
            "__typename": [
                1
            ]
        },
        "FormFieldConfiguration": {
            "configurationType": [
                594
            ],
            "fieldMetadataId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "FrontComponent": {
            "applicationGrantedCapabilities": [
                1
            ],
            "applicationId": [
                471
            ],
            "applicationName": [
                1
            ],
            "applicationTokenPair": [
                70
            ],
            "applicationVariables": [
                277
            ],
            "builtComponentChecksum": [
                1
            ],
            "builtComponentPath": [
                1
            ],
            "componentName": [
                1
            ],
            "createdAt": [
                197
            ],
            "description": [
                1
            ],
            "frontComponentSharedDependenciesChecksum": [
                1
            ],
            "id": [
                471
            ],
            "isHeadless": [
                4
            ],
            "name": [
                1
            ],
            "sourceComponentPath": [
                1
            ],
            "universalIdentifier": [
                471
            ],
            "updatedAt": [
                197
            ],
            "usesSdkClient": [
                4
            ],
            "widgetAvailability": [
                254
            ],
            "__typename": [
                1
            ]
        },
        "FrontComponentConfiguration": {
            "configurationType": [
                594
            ],
            "frontComponentId": [
                471
            ],
            "headerCommandMenuItemUniversalIdentifiers": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "FrontComponentWidgetAvailability": {
            "objectMetadataId": [
                471
            ],
            "pageLayoutType": [
                359
            ],
            "__typename": [
                1
            ]
        },
        "FullName": {
            "firstName": [
                1
            ],
            "lastName": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "GetApiKeyInput": {
            "id": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "GrantApplicationCapabilitiesInput": {
            "applicationId": [
                471
            ],
            "capabilities": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "GraphOrderBy": {},
        "GridPosition": {
            "column": [
                6
            ],
            "columnSpan": [
                6
            ],
            "row": [
                6
            ],
            "rowSpan": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "IframeConfiguration": {
            "configurationType": [
                594
            ],
            "url": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ImapSmtpCaldavConnectionSuccess": {
            "connectedAccountId": [
                1
            ],
            "success": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "ImapSmtpCaldavPublicConnectionParameters": {
            "CALDAV": [
                263
            ],
            "IMAP": [
                263
            ],
            "SMTP": [
                263
            ],
            "name": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ImapSmtpCaldavPublicConnectionParams": {
            "connectionSecurity": [
                218
            ],
            "host": [
                1
            ],
            "port": [
                6
            ],
            "username": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "Impersonate": {
            "loginToken": [
                76
            ],
            "workspace": [
                617
            ],
            "__typename": [
                1
            ]
        },
        "InboxThreadRecordInput": {
            "objectNameSingular": [
                1
            ],
            "recordId": [
                471
            ],
            "threadId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "Index": {
            "applicationId": [
                471
            ],
            "createdAt": [
                197
            ],
            "id": [
                471
            ],
            "indexFieldMetadataList": [
                268
            ],
            "indexType": [
                270
            ],
            "indexWhereClause": [
                1
            ],
            "isCustom": [
                4
            ],
            "isSystemSideEffect": [
                4
            ],
            "isUnique": [
                4
            ],
            "name": [
                1
            ],
            "updatedAt": [
                197
            ],
            "__typename": [
                1
            ]
        },
        "IndexEdge": {
            "cursor": [
                151
            ],
            "node": [
                266
            ],
            "__typename": [
                1
            ]
        },
        "IndexField": {
            "createdAt": [
                197
            ],
            "fieldMetadataId": [
                471
            ],
            "id": [
                471
            ],
            "order": [
                6
            ],
            "subFieldName": [
                1
            ],
            "updatedAt": [
                197
            ],
            "__typename": [
                1
            ]
        },
        "IndexFilter": {
            "and": [
                269
            ],
            "id": [
                472
            ],
            "isCustom": [
                119
            ],
            "or": [
                269
            ],
            "__typename": [
                1
            ]
        },
        "IndexType": {},
        "IngestAppMessagesInput": {
            "messageChannelId": [
                471
            ],
            "messages": [
                44
            ],
            "__typename": [
                1
            ]
        },
        "IngestAppMessagesOutput": {
            "messages": [
                273
            ],
            "__typename": [
                1
            ]
        },
        "IngestedAppMessage": {
            "externalId": [
                1
            ],
            "messageId": [
                471
            ],
            "messageThreadId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "InitiateTwoFactorAuthenticationProvisioning": {
            "uri": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "InvalidatePassword": {
            "success": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "InviteSuggestion": {
            "displayName": [
                1
            ],
            "email": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "JSON": {},
        "JSONObject": {},
        "JobState": {},
        "JobStatus": {
            "attemptsMade": [
                10
            ],
            "enqueuedAt": [
                6
            ],
            "failedReason": [
                1
            ],
            "finishedAt": [
                6
            ],
            "jobId": [
                1
            ],
            "progress": [
                10
            ],
            "startedAt": [
                6
            ],
            "state": [
                279
            ],
            "__typename": [
                1
            ]
        },
        "LineChartConfiguration": {
            "aggregateFieldMetadataId": [
                471
            ],
            "aggregateOperation": [
                27
            ],
            "axisNameDisplay": [
                84
            ],
            "color": [
                1
            ],
            "configurationType": [
                594
            ],
            "description": [
                1
            ],
            "displayDataLabel": [
                4
            ],
            "displayLegend": [
                4
            ],
            "filter": [
                277
            ],
            "firstDayOfTheWeek": [
                10
            ],
            "isCumulative": [
                4
            ],
            "isStacked": [
                4
            ],
            "numberFormat": [
                131
            ],
            "omitNullValues": [
                4
            ],
            "primaryAxisDateGranularity": [
                349
            ],
            "primaryAxisGroupByFieldMetadataId": [
                471
            ],
            "primaryAxisGroupBySubFieldName": [
                1
            ],
            "primaryAxisManualSortOrder": [
                1
            ],
            "primaryAxisOrderBy": [
                258
            ],
            "rangeMax": [
                6
            ],
            "rangeMin": [
                6
            ],
            "secondaryAxisGroupByDateGranularity": [
                349
            ],
            "secondaryAxisGroupByFieldMetadataId": [
                471
            ],
            "secondaryAxisGroupBySubFieldName": [
                1
            ],
            "secondaryAxisManualSortOrder": [
                1
            ],
            "secondaryAxisOrderBy": [
                258
            ],
            "splitMultiValueFields": [
                4
            ],
            "timezone": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "LineChartData": {
            "formattedToRawLookup": [
                277
            ],
            "hasTooManyGroups": [
                4
            ],
            "series": [
                285
            ],
            "showDataLabels": [
                4
            ],
            "showLegend": [
                4
            ],
            "xAxisLabel": [
                1
            ],
            "yAxisLabel": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "LineChartDataInput": {
            "configuration": [
                277
            ],
            "objectMetadataId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "LineChartDataPoint": {
            "x": [
                1
            ],
            "y": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "LineChartSeries": {
            "data": [
                284
            ],
            "key": [
                1
            ],
            "label": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ListAppConnectionsInput": {
            "providerName": [
                1
            ],
            "scope": [
                149
            ],
            "userWorkspaceId": [
                1
            ],
            "visibility": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ListAppMessageChannelsInput": {
            "connectedAccountId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "ListAppMessageFoldersInput": {
            "messageChannelId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "Location": {
            "lat": [
                6
            ],
            "lng": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "LogicFunction": {
            "applicationId": [
                471
            ],
            "canRunOnDemand": [
                4
            ],
            "createdAt": [
                197
            ],
            "cronTriggerSettings": [
                277
            ],
            "databaseEventTriggerSettings": [
                277
            ],
            "description": [
                1
            ],
            "executionMode": [
                291
            ],
            "handlerName": [
                1
            ],
            "httpRouteTriggerSettings": [
                277
            ],
            "id": [
                471
            ],
            "name": [
                1
            ],
            "runtime": [
                1
            ],
            "sourceHandlerPath": [
                1
            ],
            "timeoutSeconds": [
                6
            ],
            "toolTriggerSettings": [
                277
            ],
            "universalIdentifier": [
                471
            ],
            "updatedAt": [
                197
            ],
            "workflowActionTriggerSettings": [
                277
            ],
            "__typename": [
                1
            ]
        },
        "LogicFunctionExecutionMode": {},
        "LogicFunctionExecutionResult": {
            "data": [
                277
            ],
            "duration": [
                6
            ],
            "error": [
                277
            ],
            "logs": [
                1
            ],
            "status": [
                293
            ],
            "__typename": [
                1
            ]
        },
        "LogicFunctionExecutionStatus": {},
        "LogicFunctionIdInput": {
            "id": [
                18
            ],
            "__typename": [
                1
            ]
        },
        "LogicFunctionLogs": {
            "logs": [
                1
            ],
            "name": [
                1
            ],
            "universalIdentifier": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "LogicFunctionLogsInput": {
            "applicationId": [
                471
            ],
            "applicationUniversalIdentifier": [
                471
            ],
            "id": [
                471
            ],
            "name": [
                1
            ],
            "universalIdentifier": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "LoginToken": {
            "loginToken": [
                76
            ],
            "__typename": [
                1
            ]
        },
        "MarketplaceApp": {
            "author": [
                1
            ],
            "category": [
                1
            ],
            "description": [
                1
            ],
            "id": [
                1
            ],
            "isListed": [
                4
            ],
            "logoUrl": [
                1
            ],
            "name": [
                1
            ],
            "sourcePackage": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "MarketplaceAppDetail": {
            "aboutDescription": [
                1
            ],
            "author": [
                1
            ],
            "billsCredits": [
                4
            ],
            "category": [
                1
            ],
            "defaultRoleUniversalIdentifier": [
                1
            ],
            "description": [
                1
            ],
            "emailSupport": [
                1
            ],
            "galleryImages": [
                1
            ],
            "id": [
                1
            ],
            "installCount": [
                10
            ],
            "isListed": [
                4
            ],
            "issueReportUrl": [
                1
            ],
            "latestAvailableVersion": [
                1
            ],
            "logoUrl": [
                1
            ],
            "manifest": [
                277
            ],
            "name": [
                1
            ],
            "objects": [
                300
            ],
            "pricingDescription": [
                1
            ],
            "requestedCapabilities": [
                1
            ],
            "roles": [
                301
            ],
            "screenshots": [
                1
            ],
            "sourcePackage": [
                1
            ],
            "sourceType": [
                66
            ],
            "termsUrl": [
                1
            ],
            "universalIdentifier": [
                1
            ],
            "websiteUrl": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "MarketplaceAppObject": {
            "labelPlural": [
                1
            ],
            "labelSingular": [
                1
            ],
            "universalIdentifier": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "MarketplaceAppRole": {
            "canAccessAllTools": [
                4
            ],
            "canDestroyAllObjectRecords": [
                4
            ],
            "canReadAllObjectRecords": [
                4
            ],
            "canSoftDeleteAllObjectRecords": [
                4
            ],
            "canUpdateAllObjectRecords": [
                4
            ],
            "canUpdateAllSettings": [
                4
            ],
            "description": [
                1
            ],
            "fieldPermissions": [
                302
            ],
            "icon": [
                1
            ],
            "label": [
                1
            ],
            "objectPermissions": [
                303
            ],
            "permissionFlagUniversalIdentifiers": [
                1
            ],
            "universalIdentifier": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "MarketplaceAppRoleFieldPermission": {
            "canReadFieldValue": [
                4
            ],
            "canUpdateFieldValue": [
                4
            ],
            "fieldUniversalIdentifier": [
                1
            ],
            "objectUniversalIdentifier": [
                1
            ],
            "universalIdentifier": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "MarketplaceAppRoleObjectPermission": {
            "canDestroyObjectRecords": [
                4
            ],
            "canReadObjectRecords": [
                4
            ],
            "canSoftDeleteObjectRecords": [
                4
            ],
            "canUpdateObjectRecords": [
                4
            ],
            "objectUniversalIdentifier": [
                1
            ],
            "universalIdentifier": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "McpServer": {
            "applicationId": [
                471
            ],
            "connectionProviderId": [
                471
            ],
            "createdAt": [
                197
            ],
            "id": [
                471
            ],
            "isActive": [
                4
            ],
            "label": [
                1
            ],
            "name": [
                1
            ],
            "updatedAt": [
                197
            ],
            "url": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "MessageCampaignBodyConfiguration": {
            "configurationType": [
                594
            ],
            "__typename": [
                1
            ]
        },
        "MessageCampaignDetailsConfiguration": {
            "configurationType": [
                594
            ],
            "__typename": [
                1
            ]
        },
        "MessageChannel": {
            "connectedAccount": [
                148
            ],
            "connectedAccountId": [
                471
            ],
            "contactAutoCreationPolicy": [
                308
            ],
            "createdAt": [
                197
            ],
            "displayName": [
                1
            ],
            "excludeGroupEmails": [
                4
            ],
            "excludeNonProfessionalEmails": [
                4
            ],
            "handle": [
                1
            ],
            "id": [
                471
            ],
            "importProgress": [
                10
            ],
            "isContactAutoCreationEnabled": [
                4
            ],
            "isSyncEnabled": [
                4
            ],
            "messageFolderImportPolicy": [
                315
            ],
            "messagingProviderUniversalIdentifier": [
                471
            ],
            "participantHandleFieldUniversalIdentifier": [
                471
            ],
            "pendingGroupEmailsAction": [
                309
            ],
            "syncStage": [
                310
            ],
            "syncStageStartedAt": [
                197
            ],
            "syncStatus": [
                311
            ],
            "syncedAt": [
                197
            ],
            "throttleFailureCount": [
                6
            ],
            "throttleRetryAfter": [
                197
            ],
            "type": [
                312
            ],
            "updatedAt": [
                197
            ],
            "visibility": [
                313
            ],
            "__typename": [
                1
            ]
        },
        "MessageChannelContactAutoCreationPolicy": {},
        "MessageChannelPendingGroupEmailsAction": {},
        "MessageChannelSyncStage": {},
        "MessageChannelSyncStatus": {},
        "MessageChannelType": {},
        "MessageChannelVisibility": {},
        "MessageFolder": {
            "createdAt": [
                197
            ],
            "externalId": [
                1
            ],
            "id": [
                471
            ],
            "isSentFolder": [
                4
            ],
            "isSynced": [
                4
            ],
            "messageChannelId": [
                471
            ],
            "name": [
                1
            ],
            "parentFolderId": [
                1
            ],
            "pendingSyncAction": [
                316
            ],
            "updatedAt": [
                197
            ],
            "__typename": [
                1
            ]
        },
        "MessageFolderImportPolicy": {},
        "MessageFolderPendingSyncAction": {},
        "MessageParticipantRole": {},
        "MetadataEvent": {
            "metadataName": [
                1
            ],
            "properties": [
                347
            ],
            "recordId": [
                1
            ],
            "type": [
                319
            ],
            "updatedCollectionHash": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "MetadataEventAction": {},
        "MetadataReadability": {},
        "MetadataTranslation": {
            "canonicalValue": [
                1
            ],
            "locale": [
                1
            ],
            "metadataName": [
                1
            ],
            "objectMetadataId": [
                471
            ],
            "property": [
                1
            ],
            "provenance": [
                323
            ],
            "recordId": [
                471
            ],
            "sourceValue": [
                1
            ],
            "value": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "MetadataTranslationOverrideInput": {
            "locale": [
                1
            ],
            "property": [
                1
            ],
            "value": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "MetadataTranslationProvenance": {},
        "MetadataTranslationsInput": {
            "fieldMetadataId": [
                471
            ],
            "locale": [
                1
            ],
            "objectMetadataId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "MetadataWritability": {},
        "MinimalMetadata": {
            "collectionHashes": [
                143
            ],
            "objectMetadataItems": [
                327
            ],
            "views": [
                328
            ],
            "__typename": [
                1
            ]
        },
        "MinimalObjectMetadata": {
            "color": [
                1
            ],
            "icon": [
                1
            ],
            "id": [
                471
            ],
            "isActive": [
                4
            ],
            "isRemote": [
                4
            ],
            "isSystem": [
                4
            ],
            "labelPlural": [
                1
            ],
            "labelSingular": [
                1
            ],
            "namePlural": [
                1
            ],
            "nameSingular": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "MinimalView": {
            "id": [
                471
            ],
            "key": [
                586
            ],
            "objectMetadataId": [
                471
            ],
            "type": [
                590
            ],
            "__typename": [
                1
            ]
        },
        "ModelFamily": {},
        "Mutation": {
            "activateSkill": [
                437,
                {
                    "id": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "activateWorkspace": [
                599,
                {
                    "data": [
                        0,
                        "ActivateWorkspaceInput!"
                    ]
                }
            ],
            "addAgentChatMessageReaction": [
                23,
                {
                    "emoji": [
                        1,
                        "String!"
                    ],
                    "messageId": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "addQueryToEventStream": [
                4,
                {
                    "input": [
                        2,
                        "AddQuerySubscriptionInput!"
                    ]
                }
            ],
            "assignAgentChatThread": [
                4,
                {
                    "assigneeWorkspaceMemberId": [
                        471
                    ],
                    "threadId": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "assignRoleToAgent": [
                4,
                {
                    "agentId": [
                        471,
                        "UUID!"
                    ],
                    "roleId": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "assignRoleToApiKey": [
                4,
                {
                    "apiKeyId": [
                        471,
                        "UUID!"
                    ],
                    "roleId": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "attachRecordToInboxThread": [
                4,
                {
                    "input": [
                        265,
                        "InboxThreadRecordInput!"
                    ]
                }
            ],
            "authorizeApp": [
                79,
                {
                    "clientId": [
                        1,
                        "String!"
                    ],
                    "codeChallenge": [
                        1
                    ],
                    "issuer": [
                        1
                    ],
                    "redirectUrl": [
                        1,
                        "String!"
                    ],
                    "scope": [
                        1
                    ],
                    "state": [
                        1
                    ]
                }
            ],
            "cancelSwitchBillingInterval": [
                117
            ],
            "cancelSwitchBillingPlan": [
                117
            ],
            "cancelSwitchResourceCreditPrice": [
                117
            ],
            "checkoutSession": [
                110,
                {
                    "plan": [
                        101,
                        "BillingPlanKey!"
                    ],
                    "recurringInterval": [
                        443,
                        "SubscriptionInterval!"
                    ],
                    "requirePaymentMethod": [
                        4,
                        "Boolean!"
                    ],
                    "successUrlPath": [
                        1
                    ]
                }
            ],
            "claimApplicationRegistrationOwnership": [
                65,
                {
                    "applicationRegistrationId": [
                        1,
                        "String!"
                    ]
                }
            ],
            "completeAppTarballUpload": [
                65,
                {
                    "fileId": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "completeApplicationFileUploads": [
                147,
                {
                    "applicationUniversalIdentifier": [
                        1,
                        "String!"
                    ],
                    "fileIds": [
                        471,
                        "[UUID!]!"
                    ]
                }
            ],
            "completeBookCallOnboardingStep": [
                353,
                {
                    "hasBookedCall": [
                        4,
                        "Boolean!"
                    ],
                    "isAutoSkipped": [
                        4,
                        "Boolean!"
                    ]
                }
            ],
            "completeFileUpload": [
                249,
                {
                    "fileId": [
                        1,
                        "String!"
                    ]
                }
            ],
            "completeNewWorkspaceLogoUpload": [
                249,
                {
                    "fileId": [
                        1,
                        "String!"
                    ],
                    "workspaceId": [
                        1,
                        "String!"
                    ]
                }
            ],
            "completeWorkspaceLogoUpload": [
                249,
                {
                    "fileId": [
                        1,
                        "String!"
                    ]
                }
            ],
            "completeWorkspaceMemberProfilePictureUpload": [
                249,
                {
                    "fileId": [
                        1,
                        "String!"
                    ]
                }
            ],
            "createAgentChatChannel": [
                5,
                {
                    "input": [
                        154,
                        "CreateAgentChatChannelInput!"
                    ]
                }
            ],
            "createApiKey": [
                37,
                {
                    "input": [
                        156,
                        "CreateApiKeyInput!"
                    ]
                }
            ],
            "createAppMessageChannel": [
                307,
                {
                    "input": [
                        157,
                        "CreateAppMessageChannelInput!"
                    ]
                }
            ],
            "createApplicationFileUploads": [
                158,
                {
                    "applicationUniversalIdentifier": [
                        1,
                        "String!"
                    ],
                    "files": [
                        59,
                        "[ApplicationFileUploadRequestInput!]!"
                    ]
                }
            ],
            "createApplicationRegistration": [
                159,
                {
                    "input": [
                        160,
                        "CreateApplicationRegistrationInput!"
                    ]
                }
            ],
            "createApprovedAccessDomain": [
                73,
                {
                    "input": [
                        161,
                        "CreateApprovedAccessDomainInput!"
                    ]
                }
            ],
            "createBillingPaymentMethodSetupIntent": [
                99
            ],
            "createCalendarEvent": [
                163,
                {
                    "input": [
                        162,
                        "CreateCalendarEventInput!"
                    ]
                }
            ],
            "createChatThread": [
                17,
                {
                    "channelId": [
                        471
                    ]
                }
            ],
            "createCommandMenuItem": [
                144,
                {
                    "input": [
                        164,
                        "CreateCommandMenuItemInput!"
                    ]
                }
            ],
            "createDevelopmentApplication": [
                214,
                {
                    "name": [
                        1,
                        "String!"
                    ],
                    "universalIdentifier": [
                        1,
                        "String!"
                    ]
                }
            ],
            "createEmailGroupChannel": [
                166,
                {
                    "input": [
                        165,
                        "CreateEmailGroupChannelInput!"
                    ]
                }
            ],
            "createFileUpload": [
                248,
                {
                    "fieldMetadataId": [
                        1
                    ],
                    "fieldMetadataUniversalIdentifier": [
                        1
                    ],
                    "fileFolder": [
                        247,
                        "FileFolder!"
                    ],
                    "filename": [
                        1,
                        "String!"
                    ],
                    "size": [
                        6,
                        "Float!"
                    ]
                }
            ],
            "createFrontComponent": [
                252,
                {
                    "input": [
                        168,
                        "CreateFrontComponentInput!"
                    ]
                }
            ],
            "createManyNavigationMenuItems": [
                332,
                {
                    "inputs": [
                        173,
                        "[CreateNavigationMenuItemInput!]!"
                    ]
                }
            ],
            "createManyViewFieldGroups": [
                580,
                {
                    "inputs": [
                        186,
                        "[CreateViewFieldGroupInput!]!"
                    ]
                }
            ],
            "createManyViewFields": [
                579,
                {
                    "inputs": [
                        187,
                        "[CreateViewFieldInput!]!"
                    ]
                }
            ],
            "createManyViewGroups": [
                585,
                {
                    "inputs": [
                        190,
                        "[CreateViewGroupInput!]!"
                    ]
                }
            ],
            "createMcpServer": [
                304,
                {
                    "input": [
                        172,
                        "CreateMcpServerInput!"
                    ]
                }
            ],
            "createNavigationMenuItem": [
                332,
                {
                    "input": [
                        173,
                        "CreateNavigationMenuItemInput!"
                    ]
                }
            ],
            "createNewWorkspaceLogoUpload": [
                248,
                {
                    "filename": [
                        1,
                        "String!"
                    ],
                    "size": [
                        6,
                        "Float!"
                    ],
                    "workspaceId": [
                        1,
                        "String!"
                    ]
                }
            ],
            "createObjectEvent": [
                34,
                {
                    "event": [
                        1,
                        "String!"
                    ],
                    "objectMetadataId": [
                        471,
                        "UUID!"
                    ],
                    "properties": [
                        277
                    ],
                    "recordId": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "createOneAgent": [
                3,
                {
                    "input": [
                        155,
                        "CreateAgentInput!"
                    ]
                }
            ],
            "createOneField": [
                234,
                {
                    "input": [
                        175,
                        "CreateOneFieldMetadataInput!"
                    ]
                }
            ],
            "createOneIndex": [
                266,
                {
                    "input": [
                        176,
                        "CreateOneIndexInput!"
                    ]
                }
            ],
            "createOneLogicFunction": [
                290,
                {
                    "input": [
                        171,
                        "CreateLogicFunctionFromSourceInput!"
                    ]
                }
            ],
            "createOneObject": [
                335,
                {
                    "input": [
                        177,
                        "CreateOneObjectInput!"
                    ]
                }
            ],
            "createOneRole": [
                404,
                {
                    "createRoleInput": [
                        182,
                        "CreateRoleInput!"
                    ]
                }
            ],
            "createPageLayout": [
                356,
                {
                    "input": [
                        178,
                        "CreatePageLayoutInput!"
                    ]
                }
            ],
            "createPageLayoutTab": [
                357,
                {
                    "input": [
                        179,
                        "CreatePageLayoutTabInput!"
                    ]
                }
            ],
            "createPageLayoutWidget": [
                360,
                {
                    "input": [
                        180,
                        "CreatePageLayoutWidgetInput!"
                    ]
                }
            ],
            "createSkill": [
                437,
                {
                    "input": [
                        183,
                        "CreateSkillInput!"
                    ]
                }
            ],
            "createSubscriptionPaymentIntent": [
                99,
                {
                    "idempotencyKey": [
                        1,
                        "String!"
                    ],
                    "plan": [
                        101,
                        "BillingPlanKey!"
                    ],
                    "recurringInterval": [
                        443,
                        "SubscriptionInterval!"
                    ],
                    "requirePaymentMethod": [
                        4,
                        "Boolean!"
                    ],
                    "successUrlPath": [
                        1
                    ]
                }
            ],
            "createUsageLimit": [
                552,
                {
                    "input": [
                        184,
                        "CreateUsageLimitInput!"
                    ]
                }
            ],
            "createValidationRule": [
                572,
                {
                    "input": [
                        185,
                        "CreateValidationRuleInput!"
                    ]
                }
            ],
            "createView": [
                576,
                {
                    "input": [
                        191,
                        "CreateViewInput!"
                    ]
                }
            ],
            "createViewField": [
                579,
                {
                    "input": [
                        187,
                        "CreateViewFieldInput!"
                    ]
                }
            ],
            "createViewFieldGroup": [
                580,
                {
                    "input": [
                        186,
                        "CreateViewFieldGroupInput!"
                    ]
                }
            ],
            "createViewFilter": [
                581,
                {
                    "input": [
                        189,
                        "CreateViewFilterInput!"
                    ]
                }
            ],
            "createViewFilterGroup": [
                582,
                {
                    "input": [
                        188,
                        "CreateViewFilterGroupInput!"
                    ]
                }
            ],
            "createViewGroup": [
                585,
                {
                    "input": [
                        190,
                        "CreateViewGroupInput!"
                    ]
                }
            ],
            "createViewSort": [
                588,
                {
                    "input": [
                        192,
                        "CreateViewSortInput!"
                    ]
                }
            ],
            "createWebhook": [
                592,
                {
                    "input": [
                        193,
                        "CreateWebhookInput!"
                    ]
                }
            ],
            "deactivateSkill": [
                437,
                {
                    "id": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "deleteAgentChatChannel": [
                4,
                {
                    "channelId": [
                        471,
                        "UUID!"
                    ],
                    "destinationChannelId": [
                        471
                    ]
                }
            ],
            "deleteAppKeyValue": [
                4,
                {
                    "key": [
                        1,
                        "String!"
                    ],
                    "scope": [
                        42
                    ]
                }
            ],
            "deleteAppMessageChannel": [
                307,
                {
                    "id": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "deleteApplicationRegistration": [
                4,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "deleteApprovedAccessDomain": [
                4,
                {
                    "input": [
                        198,
                        "DeleteApprovedAccessDomainInput!"
                    ]
                }
            ],
            "deleteCommandMenuItem": [
                144,
                {
                    "id": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "deleteConnectedAccount": [
                148,
                {
                    "id": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "deleteCurrentWorkspace": [
                599
            ],
            "deleteEmailGroupChannel": [
                307,
                {
                    "id": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "deleteFrontComponent": [
                252,
                {
                    "id": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "deleteManyNavigationMenuItems": [
                332,
                {
                    "ids": [
                        471,
                        "[UUID!]!"
                    ]
                }
            ],
            "deleteMcpServer": [
                304,
                {
                    "id": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "deleteNavigationMenuItem": [
                332,
                {
                    "id": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "deleteOneAgent": [
                3,
                {
                    "input": [
                        20,
                        "AgentIdInput!"
                    ]
                }
            ],
            "deleteOneField": [
                234,
                {
                    "input": [
                        199,
                        "DeleteOneFieldInput!"
                    ]
                }
            ],
            "deleteOneIndex": [
                266,
                {
                    "input": [
                        200,
                        "DeleteOneIndexInput!"
                    ]
                }
            ],
            "deleteOneLogicFunction": [
                290,
                {
                    "input": [
                        294,
                        "LogicFunctionIdInput!"
                    ]
                }
            ],
            "deleteOneObject": [
                335,
                {
                    "input": [
                        201,
                        "DeleteOneObjectInput!"
                    ]
                }
            ],
            "deleteOneRole": [
                1,
                {
                    "roleId": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "deleteQueuedChatMessage": [
                4,
                {
                    "messageId": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "deleteSkill": [
                437,
                {
                    "id": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "deleteTwoFactorAuthenticationMethod": [
                202,
                {
                    "twoFactorAuthenticationMethodId": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "deleteUsageLimit": [
                4,
                {
                    "usageLimitId": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "deleteUser": [
                565
            ],
            "deleteUserFromWorkspace": [
                569,
                {
                    "workspaceMemberIdToDelete": [
                        1,
                        "String!"
                    ]
                }
            ],
            "deleteValidationRule": [
                572,
                {
                    "id": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "deleteView": [
                4,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "deleteViewField": [
                579,
                {
                    "input": [
                        204,
                        "DeleteViewFieldInput!"
                    ]
                }
            ],
            "deleteViewFieldGroup": [
                580,
                {
                    "input": [
                        203,
                        "DeleteViewFieldGroupInput!"
                    ]
                }
            ],
            "deleteViewFilter": [
                581,
                {
                    "input": [
                        205,
                        "DeleteViewFilterInput!"
                    ]
                }
            ],
            "deleteViewFilterGroup": [
                4,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "deleteViewGroup": [
                585,
                {
                    "input": [
                        206,
                        "DeleteViewGroupInput!"
                    ]
                }
            ],
            "deleteViewSort": [
                4,
                {
                    "input": [
                        207,
                        "DeleteViewSortInput!"
                    ]
                }
            ],
            "deleteWebhook": [
                592,
                {
                    "id": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "deleteWorkspaceInvitation": [
                1,
                {
                    "appTokenId": [
                        1,
                        "String!"
                    ]
                }
            ],
            "destroyPageLayout": [
                4,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "destroyPageLayoutTab": [
                4,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "destroyPageLayoutWidget": [
                4,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "destroyView": [
                4,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "destroyViewField": [
                579,
                {
                    "input": [
                        210,
                        "DestroyViewFieldInput!"
                    ]
                }
            ],
            "destroyViewFieldGroup": [
                580,
                {
                    "input": [
                        209,
                        "DestroyViewFieldGroupInput!"
                    ]
                }
            ],
            "destroyViewFilter": [
                581,
                {
                    "input": [
                        211,
                        "DestroyViewFilterInput!"
                    ]
                }
            ],
            "destroyViewFilterGroup": [
                4,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "destroyViewGroup": [
                585,
                {
                    "input": [
                        212,
                        "DestroyViewGroupInput!"
                    ]
                }
            ],
            "destroyViewSort": [
                4,
                {
                    "input": [
                        213,
                        "DestroyViewSortInput!"
                    ]
                }
            ],
            "detachRecordFromInboxThread": [
                4,
                {
                    "input": [
                        265,
                        "InboxThreadRecordInput!"
                    ]
                }
            ],
            "disconnectConnectedAccount": [
                148,
                {
                    "id": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "duplicateDashboard": [
                215,
                {
                    "id": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "duplicateMessageList": [
                216,
                {
                    "id": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "emailPasswordResetLink": [
                219,
                {
                    "captchaToken": [
                        1
                    ],
                    "email": [
                        1,
                        "String!"
                    ],
                    "workspaceId": [
                        471
                    ]
                }
            ],
            "endSubscriptionTrialPeriod": [
                94
            ],
            "enqueueJob": [
                225,
                {
                    "input": [
                        223,
                        "EnqueueJobInput!"
                    ]
                }
            ],
            "enqueueJobs": [
                227,
                {
                    "input": [
                        226,
                        "EnqueueJobsInput!"
                    ]
                }
            ],
            "enrichWorkspaceCompany": [
                603
            ],
            "executeOneLogicFunction": [
                292,
                {
                    "input": [
                        231,
                        "ExecuteOneLogicFunctionInput!"
                    ]
                }
            ],
            "generateApiKeyToken": [
                39,
                {
                    "apiKeyId": [
                        471,
                        "UUID!"
                    ],
                    "expiresAt": [
                        1,
                        "String!"
                    ]
                }
            ],
            "generateFrontComponentApplicationTokenPair": [
                70,
                {
                    "applicationId": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "generatePlaygroundToken": [
                76
            ],
            "generateTransientToken": [
                454
            ],
            "generateTwoFactorAuthenticationRecoveryCode": [
                468,
                {
                    "otp": [
                        1
                    ],
                    "userId": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "getAuthTokensFromLoginToken": [
                78,
                {
                    "loginToken": [
                        1,
                        "String!"
                    ],
                    "origin": [
                        1,
                        "String!"
                    ]
                }
            ],
            "getAuthTokensFromOTP": [
                78,
                {
                    "captchaToken": [
                        1
                    ],
                    "loginToken": [
                        1,
                        "String!"
                    ],
                    "origin": [
                        1,
                        "String!"
                    ],
                    "otp": [
                        1,
                        "String!"
                    ]
                }
            ],
            "getAuthTokensFromSSOExchangeToken": [
                78,
                {
                    "ssoExchangeToken": [
                        1,
                        "String!"
                    ]
                }
            ],
            "getAuthTokensFromTwoFactorAuthenticationRecoveryCode": [
                469,
                {
                    "captchaToken": [
                        1
                    ],
                    "loginToken": [
                        1,
                        "String!"
                    ],
                    "origin": [
                        1,
                        "String!"
                    ],
                    "recoveryCode": [
                        1,
                        "String!"
                    ]
                }
            ],
            "getLoginTokenFromCredentials": [
                297,
                {
                    "captchaToken": [
                        1
                    ],
                    "email": [
                        1,
                        "String!"
                    ],
                    "locale": [
                        1
                    ],
                    "origin": [
                        1,
                        "String!"
                    ],
                    "password": [
                        1,
                        "String!"
                    ],
                    "verifyEmailRedirectPath": [
                        1
                    ]
                }
            ],
            "goBackToPreviousOnboardingStep": [
                352
            ],
            "grantApplicationCapabilities": [
                48,
                {
                    "input": [
                        257,
                        "GrantApplicationCapabilitiesInput!"
                    ]
                }
            ],
            "impersonate": [
                264,
                {
                    "userId": [
                        471,
                        "UUID!"
                    ],
                    "workspaceId": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "ingestAppMessages": [
                272,
                {
                    "input": [
                        271,
                        "IngestAppMessagesInput!"
                    ]
                }
            ],
            "initiateOTPProvisioning": [
                274,
                {
                    "loginToken": [
                        1,
                        "String!"
                    ],
                    "origin": [
                        1,
                        "String!"
                    ]
                }
            ],
            "initiateOTPProvisioningForAuthenticatedUser": [
                274
            ],
            "installApplication": [
                46,
                {
                    "universalIdentifier": [
                        1,
                        "String!"
                    ],
                    "version": [
                        1
                    ]
                }
            ],
            "installMarketplaceApp": [
                4,
                {
                    "universalIdentifier": [
                        1,
                        "String!"
                    ],
                    "version": [
                        1
                    ]
                }
            ],
            "markAgentChatThreadAsDoneInChannel": [
                4,
                {
                    "threadId": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "moveAgentChatThreadToChannel": [
                4,
                {
                    "channelId": [
                        471
                    ],
                    "threadId": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "refreshEnterpriseValidityToken": [
                4
            ],
            "releaseEnterpriseServerBinding": [
                228
            ],
            "removeAgentChatMessageReaction": [
                23,
                {
                    "emoji": [
                        1,
                        "String!"
                    ],
                    "messageId": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "removeQueryFromEventStream": [
                4,
                {
                    "input": [
                        399,
                        "RemoveQueryFromEventStreamInput!"
                    ]
                }
            ],
            "removeRecordShare": [
                391,
                {
                    "principal": [
                        388,
                        "RecordSharePrincipalInput!"
                    ],
                    "target": [
                        396,
                        "RecordTargetInput!"
                    ]
                }
            ],
            "removeRoleFromAgent": [
                4,
                {
                    "agentId": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "renewApplicationToken": [
                70,
                {
                    "applicationRefreshToken": [
                        1,
                        "String!"
                    ]
                }
            ],
            "renewToken": [
                78,
                {
                    "appToken": [
                        1,
                        "String!"
                    ]
                }
            ],
            "reopenAgentChatThreadInChannel": [
                4,
                {
                    "threadId": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "reportAppConnectionAuthFailure": [
                4,
                {
                    "input": [
                        400,
                        "ReportAppConnectionAuthFailureInput!"
                    ]
                }
            ],
            "resendEmailVerificationToken": [
                401,
                {
                    "email": [
                        1,
                        "String!"
                    ],
                    "origin": [
                        1,
                        "String!"
                    ]
                }
            ],
            "resendWorkspaceInvitation": [
                430,
                {
                    "appTokenId": [
                        1,
                        "String!"
                    ]
                }
            ],
            "resetCommandMenuItem": [
                144,
                {
                    "id": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "resetPageLayoutTabToDefault": [
                357,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "resetPageLayoutToDefault": [
                356,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "resetPageLayoutWidgetToDefault": [
                360,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "resetTimelineActivityType": [
                449,
                {
                    "id": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "retryChatMessage": [
                423,
                {
                    "modelId": [
                        1
                    ],
                    "threadId": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "revokeAllOtherUserSessions": [
                10
            ],
            "revokeApiKey": [
                37,
                {
                    "input": [
                        402,
                        "RevokeApiKeyInput!"
                    ]
                }
            ],
            "revokeApplicationAuthorization": [
                4,
                {
                    "applicationAuthorizationId": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "revokeTwoFactorAuthenticationRecoveryCode": [
                4,
                {
                    "userId": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "revokeUserSession": [
                4,
                {
                    "userSessionId": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "rotateApplicationRegistrationClientSecret": [
                406,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "runAgent": [
                417,
                {
                    "input": [
                        413,
                        "RunAgentInput!"
                    ]
                }
            ],
            "runApplicationHealthCheck": [
                62,
                {
                    "applicationId": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "saveImapSmtpCaldavAccount": [
                261,
                {
                    "connectionParameters": [
                        217,
                        "EmailAccountConnectionParameters!"
                    ],
                    "handle": [
                        1,
                        "String!"
                    ],
                    "id": [
                        471
                    ]
                }
            ],
            "sendAppChannelMessage": [
                422,
                {
                    "input": [
                        421,
                        "SendAppChannelMessageInput!"
                    ]
                }
            ],
            "sendChatMessage": [
                423,
                {
                    "browsingContext": [
                        277
                    ],
                    "channelId": [
                        471
                    ],
                    "fileAttachments": [
                        246,
                        "[FileAttachmentInput!]"
                    ],
                    "mentionedWorkspaceMemberIds": [
                        471,
                        "[UUID!]"
                    ],
                    "messageId": [
                        471,
                        "UUID!"
                    ],
                    "modelId": [
                        1
                    ],
                    "shouldAssistantReply": [
                        4
                    ],
                    "text": [
                        1,
                        "String!"
                    ],
                    "threadId": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "sendEmail": [
                426,
                {
                    "input": [
                        425,
                        "SendEmailInput!"
                    ]
                }
            ],
            "sendInboxMessage": [
                429,
                {
                    "input": [
                        428,
                        "SendInboxMessageInput!"
                    ]
                }
            ],
            "sendInvitations": [
                430,
                {
                    "emails": [
                        1,
                        "[String!]!"
                    ],
                    "roleId": [
                        471
                    ]
                }
            ],
            "setAppKeyValue": [
                41,
                {
                    "input": [
                        432,
                        "SetAppKeyValueInput!"
                    ]
                }
            ],
            "setEnterpriseKey": [
                228,
                {
                    "enterpriseKey": [
                        1,
                        "String!"
                    ]
                }
            ],
            "setRecordGeneralAccess": [
                391,
                {
                    "accessLevel": [
                        387,
                        "RecordShareAccessLevel!"
                    ],
                    "target": [
                        396,
                        "RecordTargetInput!"
                    ]
                }
            ],
            "setRecordShare": [
                391,
                {
                    "accessLevel": [
                        387,
                        "RecordShareAccessLevel!"
                    ],
                    "principal": [
                        388,
                        "RecordSharePrincipalInput!"
                    ],
                    "target": [
                        396,
                        "RecordTargetInput!"
                    ]
                }
            ],
            "setResourceCreditSubscriptionPrice": [
                117,
                {
                    "priceId": [
                        1,
                        "String!"
                    ]
                }
            ],
            "signIn": [
                83,
                {
                    "captchaToken": [
                        1
                    ],
                    "email": [
                        1,
                        "String!"
                    ],
                    "locale": [
                        1
                    ],
                    "password": [
                        1,
                        "String!"
                    ],
                    "verifyEmailRedirectPath": [
                        1
                    ]
                }
            ],
            "signOut": [
                4,
                {
                    "refreshToken": [
                        1
                    ]
                }
            ],
            "signUp": [
                83,
                {
                    "captchaToken": [
                        1
                    ],
                    "email": [
                        1,
                        "String!"
                    ],
                    "locale": [
                        1
                    ],
                    "password": [
                        1,
                        "String!"
                    ],
                    "verifyEmailRedirectPath": [
                        1
                    ]
                }
            ],
            "signUpInNewWorkspace": [
                435,
                {
                    "input": [
                        436
                    ]
                }
            ],
            "signUpInWorkspace": [
                435,
                {
                    "captchaToken": [
                        1
                    ],
                    "email": [
                        1,
                        "String!"
                    ],
                    "locale": [
                        1
                    ],
                    "password": [
                        1,
                        "String!"
                    ],
                    "verifyEmailRedirectPath": [
                        1
                    ],
                    "workspaceId": [
                        471
                    ],
                    "workspaceInviteHash": [
                        1
                    ],
                    "workspacePersonalInviteToken": [
                        1
                    ]
                }
            ],
            "skipSyncEmailOnboardingStep": [
                353,
                {
                    "isAutoSkipped": [
                        4,
                        "Boolean!"
                    ]
                }
            ],
            "snoozeAgentChatThreadInChannel": [
                4,
                {
                    "snoozedUntil": [
                        197,
                        "DateTime!"
                    ],
                    "threadId": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "startChannelSync": [
                130,
                {
                    "connectedAccountId": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "startWorkspaceSetupChat": [
                439,
                {
                    "companyContext": [
                        277
                    ],
                    "personContext": [
                        277
                    ]
                }
            ],
            "stopAgentChatStream": [
                4,
                {
                    "threadId": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "stopImpersonation": [
                440
            ],
            "switchBillingPlan": [
                117,
                {
                    "plan": [
                        101
                    ]
                }
            ],
            "switchSubscriptionInterval": [
                117
            ],
            "syncAppMessageFolders": [
                314,
                {
                    "input": [
                        447,
                        "SyncAppMessageFoldersInput!"
                    ]
                }
            ],
            "syncApplication": [
                613,
                {
                    "dryRun": [
                        4
                    ],
                    "inferDeletionFromMissingEntities": [
                        4
                    ],
                    "manifest": [
                        277,
                        "JSON!"
                    ]
                }
            ],
            "syncMarketplaceCatalog": [
                4
            ],
            "trackAnalytics": [
                34,
                {
                    "event": [
                        1
                    ],
                    "name": [
                        1
                    ],
                    "properties": [
                        277
                    ],
                    "type": [
                        35,
                        "AnalyticsType!"
                    ]
                }
            ],
            "transferApplicationRegistrationOwnership": [
                65,
                {
                    "applicationRegistrationId": [
                        1,
                        "String!"
                    ],
                    "targetWorkspaceSubdomain": [
                        1,
                        "String!"
                    ]
                }
            ],
            "triggerAddPeopleToMessageListJob": [
                456,
                {
                    "input": [
                        455,
                        "TriggerAddPeopleToMessageListJobInput!"
                    ]
                }
            ],
            "triggerInstallApplication": [
                460,
                {
                    "input": [
                        457,
                        "TriggerInstallApplicationInput!"
                    ]
                }
            ],
            "triggerInstallApplicationJob": [
                459,
                {
                    "input": [
                        458,
                        "TriggerInstallApplicationJobInput!"
                    ]
                }
            ],
            "triggerUninstallApplication": [
                464,
                {
                    "input": [
                        461,
                        "TriggerUninstallApplicationInput!"
                    ]
                }
            ],
            "triggerUninstallApplicationJob": [
                463,
                {
                    "input": [
                        462,
                        "TriggerUninstallApplicationJobInput!"
                    ]
                }
            ],
            "triggerUpgradeApplication": [
                466,
                {
                    "input": [
                        465,
                        "TriggerUpgradeApplicationInput!"
                    ]
                }
            ],
            "uninstallApplication": [
                4,
                {
                    "universalIdentifier": [
                        1,
                        "String!"
                    ]
                }
            ],
            "updateAgentChatChannel": [
                5,
                {
                    "channelId": [
                        471,
                        "UUID!"
                    ],
                    "input": [
                        473,
                        "UpdateAgentChatChannelInput!"
                    ]
                }
            ],
            "updateAgentChatThreadInboxState": [
                19,
                {
                    "action": [
                        15,
                        "AgentChatInboxAction!"
                    ],
                    "snoozedUntil": [
                        197
                    ],
                    "threadIds": [
                        471,
                        "[UUID!]!"
                    ]
                }
            ],
            "updateApiKey": [
                37,
                {
                    "input": [
                        475,
                        "UpdateApiKeyInput!"
                    ]
                }
            ],
            "updateAppMessageChannel": [
                307,
                {
                    "input": [
                        476,
                        "UpdateAppMessageChannelInput!"
                    ]
                }
            ],
            "updateApplication": [
                46,
                {
                    "id": [
                        471,
                        "UUID!"
                    ],
                    "input": [
                        477,
                        "UpdateApplicationInput!"
                    ]
                }
            ],
            "updateApplicationRegistration": [
                65,
                {
                    "input": [
                        478,
                        "UpdateApplicationRegistrationInput!"
                    ]
                }
            ],
            "updateApplicationRegistrationVariable": [
                69,
                {
                    "input": [
                        480,
                        "UpdateApplicationRegistrationVariableInput!"
                    ]
                }
            ],
            "updateCalendarChannel": [
                120,
                {
                    "input": [
                        482,
                        "UpdateCalendarChannelInput!"
                    ]
                }
            ],
            "updateCommandMenuItem": [
                144,
                {
                    "input": [
                        484,
                        "UpdateCommandMenuItemInput!"
                    ]
                }
            ],
            "updateEmailGroupChannel": [
                307,
                {
                    "input": [
                        485,
                        "UpdateEmailGroupChannelInput!"
                    ]
                }
            ],
            "updateFrontComponent": [
                252,
                {
                    "input": [
                        487,
                        "UpdateFrontComponentInput!"
                    ]
                }
            ],
            "updateLabPublicFeatureFlag": [
                232,
                {
                    "input": [
                        489,
                        "UpdateLabPublicFeatureFlagInput!"
                    ]
                }
            ],
            "updateManyNavigationMenuItems": [
                332,
                {
                    "inputs": [
                        502,
                        "[UpdateOneNavigationMenuItemInput!]!"
                    ]
                }
            ],
            "updateManyObjects": [
                335,
                {
                    "inputs": [
                        503,
                        "[UpdateOneObjectInput!]!"
                    ]
                }
            ],
            "updateManyViewGroups": [
                585,
                {
                    "inputs": [
                        524,
                        "[UpdateViewGroupInput!]!"
                    ]
                }
            ],
            "updateMcpServer": [
                304,
                {
                    "input": [
                        492,
                        "UpdateMcpServerInput!"
                    ]
                }
            ],
            "updateMessageChannel": [
                307,
                {
                    "input": [
                        494,
                        "UpdateMessageChannelInput!"
                    ]
                }
            ],
            "updateMessageFolder": [
                314,
                {
                    "input": [
                        496,
                        "UpdateMessageFolderInput!"
                    ]
                }
            ],
            "updateMessageFolders": [
                314,
                {
                    "input": [
                        498,
                        "UpdateMessageFoldersInput!"
                    ]
                }
            ],
            "updateMyUserApplicationVariable": [
                4,
                {
                    "applicationUniversalIdentifier": [
                        1,
                        "String!"
                    ],
                    "key": [
                        1,
                        "String!"
                    ],
                    "value": [
                        1,
                        "String!"
                    ]
                }
            ],
            "updateNavigationMenuItem": [
                332,
                {
                    "input": [
                        502,
                        "UpdateOneNavigationMenuItemInput!"
                    ]
                }
            ],
            "updateOneAgent": [
                3,
                {
                    "input": [
                        474,
                        "UpdateAgentInput!"
                    ]
                }
            ],
            "updateOneApplicationVariable": [
                4,
                {
                    "applicationId": [
                        471
                    ],
                    "key": [
                        1,
                        "String!"
                    ],
                    "value": [
                        1,
                        "String!"
                    ]
                }
            ],
            "updateOneField": [
                234,
                {
                    "input": [
                        501,
                        "UpdateOneFieldMetadataInput!"
                    ]
                }
            ],
            "updateOneLogicFunction": [
                4,
                {
                    "input": [
                        490,
                        "UpdateLogicFunctionFromSourceInput!"
                    ]
                }
            ],
            "updateOneObject": [
                335,
                {
                    "input": [
                        503,
                        "UpdateOneObjectInput!"
                    ]
                }
            ],
            "updateOneRole": [
                404,
                {
                    "updateRoleInput": [
                        510,
                        "UpdateRoleInput!"
                    ]
                }
            ],
            "updatePageLayout": [
                356,
                {
                    "id": [
                        1,
                        "String!"
                    ],
                    "input": [
                        504,
                        "UpdatePageLayoutInput!"
                    ]
                }
            ],
            "updatePageLayoutTab": [
                357,
                {
                    "id": [
                        1,
                        "String!"
                    ],
                    "input": [
                        505,
                        "UpdatePageLayoutTabInput!"
                    ]
                }
            ],
            "updatePageLayoutWidget": [
                360,
                {
                    "id": [
                        1,
                        "String!"
                    ],
                    "input": [
                        507,
                        "UpdatePageLayoutWidgetInput!"
                    ]
                }
            ],
            "updatePageLayoutWithTabsAndWidgets": [
                356,
                {
                    "id": [
                        1,
                        "String!"
                    ],
                    "input": [
                        509,
                        "UpdatePageLayoutWithTabsInput!"
                    ]
                }
            ],
            "updatePasswordViaResetToken": [
                275,
                {
                    "newPassword": [
                        1,
                        "String!"
                    ],
                    "passwordResetToken": [
                        1,
                        "String!"
                    ]
                }
            ],
            "updateSkill": [
                437,
                {
                    "input": [
                        512,
                        "UpdateSkillInput!"
                    ]
                }
            ],
            "updateTimelineActivityType": [
                449,
                {
                    "input": [
                        513,
                        "UpdateTimelineActivityTypeInput!"
                    ]
                }
            ],
            "updateUsageLimit": [
                552,
                {
                    "input": [
                        514,
                        "UpdateUsageLimitInput!"
                    ]
                }
            ],
            "updateUserCreditsFallback": [
                93,
                {
                    "userCreditsFallback": [
                        567,
                        "UserCreditsFallback!"
                    ]
                }
            ],
            "updateUserEmail": [
                4,
                {
                    "newEmail": [
                        1,
                        "String!"
                    ],
                    "verifyEmailRedirectPath": [
                        1
                    ]
                }
            ],
            "updateValidationRule": [
                572,
                {
                    "input": [
                        515,
                        "UpdateValidationRuleInput!"
                    ]
                }
            ],
            "updateView": [
                576,
                {
                    "id": [
                        1,
                        "String!"
                    ],
                    "input": [
                        526,
                        "UpdateViewInput!"
                    ]
                }
            ],
            "updateViewField": [
                579,
                {
                    "input": [
                        519,
                        "UpdateViewFieldInput!"
                    ]
                }
            ],
            "updateViewFieldGroup": [
                580,
                {
                    "input": [
                        517,
                        "UpdateViewFieldGroupInput!"
                    ]
                }
            ],
            "updateViewFilter": [
                581,
                {
                    "input": [
                        522,
                        "UpdateViewFilterInput!"
                    ]
                }
            ],
            "updateViewFilterGroup": [
                582,
                {
                    "id": [
                        1,
                        "String!"
                    ],
                    "input": [
                        521,
                        "UpdateViewFilterGroupInput!"
                    ]
                }
            ],
            "updateViewGroup": [
                585,
                {
                    "input": [
                        524,
                        "UpdateViewGroupInput!"
                    ]
                }
            ],
            "updateViewSort": [
                588,
                {
                    "input": [
                        527,
                        "UpdateViewSortInput!"
                    ]
                }
            ],
            "updateWebhook": [
                592,
                {
                    "input": [
                        529,
                        "UpdateWebhookInput!"
                    ]
                }
            ],
            "updateWorkspace": [
                599,
                {
                    "data": [
                        532,
                        "UpdateWorkspaceInput!"
                    ]
                }
            ],
            "updateWorkspaceAllowedIframeOrigins": [
                599,
                {
                    "data": [
                        531,
                        "UpdateWorkspaceAllowedIframeOriginsInput!"
                    ]
                }
            ],
            "updateWorkspaceMemberRole": [
                608,
                {
                    "roleId": [
                        471,
                        "UUID!"
                    ],
                    "workspaceMemberId": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "updateWorkspaceMemberSettings": [
                4,
                {
                    "input": [
                        533,
                        "UpdateWorkspaceMemberSettingsInput!"
                    ]
                }
            ],
            "upgradeApplication": [
                4,
                {
                    "appRegistrationId": [
                        1,
                        "String!"
                    ],
                    "targetVersion": [
                        1,
                        "String!"
                    ]
                }
            ],
            "uploadAppTarball": [
                65,
                {
                    "file": [
                        534,
                        "Upload!"
                    ],
                    "universalIdentifier": [
                        1
                    ]
                }
            ],
            "uploadApplicationFile": [
                245,
                {
                    "applicationUniversalIdentifier": [
                        1,
                        "String!"
                    ],
                    "file": [
                        534,
                        "Upload!"
                    ],
                    "fileFolder": [
                        247,
                        "FileFolder!"
                    ],
                    "filePath": [
                        1,
                        "String!"
                    ]
                }
            ],
            "uploadFilesFieldFileByUniversalIdentifier": [
                249,
                {
                    "fieldMetadataUniversalIdentifier": [
                        1,
                        "String!"
                    ],
                    "file": [
                        534,
                        "Upload!"
                    ]
                }
            ],
            "uploadNewWorkspaceLogo": [
                249,
                {
                    "file": [
                        534,
                        "Upload!"
                    ],
                    "workspaceId": [
                        1,
                        "String!"
                    ]
                }
            ],
            "uploadWorkspaceLogo": [
                249,
                {
                    "file": [
                        534,
                        "Upload!"
                    ]
                }
            ],
            "uploadWorkspaceMemberProfilePicture": [
                249,
                {
                    "file": [
                        534,
                        "Upload!"
                    ]
                }
            ],
            "upsertFieldPermissions": [
                241,
                {
                    "upsertFieldPermissionsInput": [
                        535,
                        "UpsertFieldPermissionsInput!"
                    ]
                }
            ],
            "upsertFieldsWidget": [
                576,
                {
                    "input": [
                        538,
                        "UpsertFieldsWidgetInput!"
                    ]
                }
            ],
            "upsertObjectPermissions": [
                343,
                {
                    "upsertObjectPermissionsInput": [
                        539,
                        "UpsertObjectPermissionsInput!"
                    ]
                }
            ],
            "upsertPermissionFlags": [
                405,
                {
                    "upsertPermissionFlagsInput": [
                        540,
                        "UpsertPermissionFlagsInput!"
                    ]
                }
            ],
            "upsertRowLevelPermissionPredicates": [
                542,
                {
                    "input": [
                        541,
                        "UpsertRowLevelPermissionPredicatesInput!"
                    ]
                }
            ],
            "upsertViewWidget": [
                576,
                {
                    "input": [
                        543,
                        "UpsertViewWidgetInput!"
                    ]
                }
            ],
            "validateApprovedAccessDomain": [
                73,
                {
                    "input": [
                        570,
                        "ValidateApprovedAccessDomainInput!"
                    ]
                }
            ],
            "verifyEmailAndGetLoginToken": [
                573,
                {
                    "captchaToken": [
                        1
                    ],
                    "email": [
                        1,
                        "String!"
                    ],
                    "emailVerificationToken": [
                        1,
                        "String!"
                    ],
                    "origin": [
                        1,
                        "String!"
                    ]
                }
            ],
            "verifyEmailAndGetWorkspaceAgnosticToken": [
                83,
                {
                    "captchaToken": [
                        1
                    ],
                    "email": [
                        1,
                        "String!"
                    ],
                    "emailVerificationToken": [
                        1,
                        "String!"
                    ]
                }
            ],
            "verifyTwoFactorAuthenticationMethodForAuthenticatedUser": [
                574,
                {
                    "otp": [
                        1,
                        "String!"
                    ]
                }
            ],
            "__typename": [
                1
            ]
        },
        "NativeModelCapabilities": {
            "twitterSearch": [
                4
            ],
            "webSearch": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "NavigationMenuItem": {
            "agentChatChannelId": [
                471
            ],
            "applicationId": [
                471
            ],
            "color": [
                1
            ],
            "createdAt": [
                197
            ],
            "folderId": [
                471
            ],
            "icon": [
                1
            ],
            "id": [
                471
            ],
            "link": [
                1
            ],
            "name": [
                1
            ],
            "pageLayoutId": [
                471
            ],
            "position": [
                6
            ],
            "targetObjectMetadataId": [
                471
            ],
            "targetRecordId": [
                471
            ],
            "targetRecordIdentifier": [
                384
            ],
            "type": [
                333
            ],
            "updatedAt": [
                197
            ],
            "userWorkspaceId": [
                471
            ],
            "viewId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "NavigationMenuItemType": {},
        "NotesConfiguration": {
            "configurationType": [
                594
            ],
            "__typename": [
                1
            ]
        },
        "Object": {
            "applicationId": [
                471
            ],
            "color": [
                1
            ],
            "createdAt": [
                197
            ],
            "description": [
                1
            ],
            "disabledObjectPermissionActions": [
                1
            ],
            "duplicateCriteria": [
                1
            ],
            "fields": [
                338,
                {
                    "filter": [
                        239,
                        "FieldFilter!"
                    ],
                    "paging": [
                        195,
                        "CursorPaging!"
                    ]
                }
            ],
            "fieldsList": [
                234
            ],
            "icon": [
                1
            ],
            "id": [
                471
            ],
            "imageIdentifierFieldMetadataId": [
                471
            ],
            "indexMetadataList": [
                266
            ],
            "indexMetadatas": [
                340,
                {
                    "filter": [
                        269,
                        "IndexFilter!"
                    ],
                    "paging": [
                        195,
                        "CursorPaging!"
                    ]
                }
            ],
            "isActive": [
                4
            ],
            "isAuditLogged": [
                4
            ],
            "isLabelSyncedWithName": [
                4
            ],
            "isRemote": [
                4
            ],
            "isSearchable": [
                4
            ],
            "isSystem": [
                4
            ],
            "isUICreatable": [
                4
            ],
            "isUIEditable": [
                4
            ],
            "isUIReadOnly": [
                4
            ],
            "labelIdentifierFieldMetadataId": [
                471
            ],
            "labelPlural": [
                1
            ],
            "labelSingular": [
                1
            ],
            "namePlural": [
                1
            ],
            "nameSingular": [
                1
            ],
            "openRecordIn": [
                342
            ],
            "readability": [
                320
            ],
            "readabilityParentFieldUniversalIdentifiers": [
                471
            ],
            "searchFieldMetadataList": [
                420
            ],
            "sharingReach": [
                350
            ],
            "shortcut": [
                1
            ],
            "universalIdentifier": [
                1
            ],
            "updatedAt": [
                197
            ],
            "writability": [
                325
            ],
            "__typename": [
                1
            ]
        },
        "ObjectConnection": {
            "edges": [
                337
            ],
            "pageInfo": [
                355
            ],
            "__typename": [
                1
            ]
        },
        "ObjectEdge": {
            "cursor": [
                151
            ],
            "node": [
                335
            ],
            "__typename": [
                1
            ]
        },
        "ObjectFieldsConnection": {
            "edges": [
                238
            ],
            "pageInfo": [
                355
            ],
            "__typename": [
                1
            ]
        },
        "ObjectFilter": {
            "and": [
                339
            ],
            "id": [
                472
            ],
            "isActive": [
                119
            ],
            "isRemote": [
                119
            ],
            "isSearchable": [
                119
            ],
            "isSystem": [
                119
            ],
            "isUICreatable": [
                119
            ],
            "isUIEditable": [
                119
            ],
            "isUIReadOnly": [
                119
            ],
            "or": [
                339
            ],
            "universalIdentifier": [
                472
            ],
            "__typename": [
                1
            ]
        },
        "ObjectIndexMetadatasConnection": {
            "edges": [
                267
            ],
            "pageInfo": [
                355
            ],
            "__typename": [
                1
            ]
        },
        "ObjectMetadataCommandMenuItemPayload": {
            "objectMetadataItemId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "ObjectOpenRecordIn": {},
        "ObjectPermission": {
            "canDestroyObjectRecords": [
                4
            ],
            "canReadObjectRecords": [
                4
            ],
            "canSoftDeleteObjectRecords": [
                4
            ],
            "canUpdateObjectRecords": [
                4
            ],
            "objectMetadataId": [
                471
            ],
            "restrictedFields": [
                277
            ],
            "rowLevelPermissionPredicateGroups": [
                408
            ],
            "rowLevelPermissionPredicates": [
                407
            ],
            "__typename": [
                1
            ]
        },
        "ObjectPermissionInput": {
            "canDestroyObjectRecords": [
                4
            ],
            "canReadObjectRecords": [
                4
            ],
            "canSoftDeleteObjectRecords": [
                4
            ],
            "canUpdateObjectRecords": [
                4
            ],
            "objectMetadataId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "ObjectRecordCount": {
            "objectNamePlural": [
                1
            ],
            "totalCount": [
                10
            ],
            "__typename": [
                1
            ]
        },
        "ObjectRecordEvent": {
            "action": [
                196
            ],
            "objectNameSingular": [
                1
            ],
            "properties": [
                347
            ],
            "recordId": [
                1
            ],
            "userId": [
                1
            ],
            "workspaceMemberId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ObjectRecordEventProperties": {
            "after": [
                277
            ],
            "before": [
                277
            ],
            "diff": [
                277
            ],
            "updatedFields": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ObjectRecordEventWithQueryIds": {
            "objectRecordEvent": [
                346
            ],
            "queryIds": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ObjectRecordGroupByDateGranularity": {},
        "ObjectSharingReach": {},
        "OnboardingStatus": {},
        "OnboardingStepNavigation": {
            "onboardingStatus": [
                351
            ],
            "previousOnboardingStatus": [
                351
            ],
            "__typename": [
                1
            ]
        },
        "OnboardingStepSuccess": {
            "success": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "OpenRecordIn": {},
        "PageInfo": {
            "endCursor": [
                151
            ],
            "hasNextPage": [
                4
            ],
            "hasPreviousPage": [
                4
            ],
            "startCursor": [
                151
            ],
            "__typename": [
                1
            ]
        },
        "PageLayout": {
            "applicationId": [
                471
            ],
            "createdAt": [
                197
            ],
            "defaultTabToFocusOnMobileAndSidePanelId": [
                471
            ],
            "deletedAt": [
                197
            ],
            "id": [
                471
            ],
            "isFirstTabPinned": [
                4
            ],
            "isSystemSideEffect": [
                4
            ],
            "name": [
                1
            ],
            "objectMetadataId": [
                471
            ],
            "tabs": [
                357
            ],
            "type": [
                359
            ],
            "universalIdentifier": [
                471
            ],
            "updatedAt": [
                197
            ],
            "__typename": [
                1
            ]
        },
        "PageLayoutTab": {
            "applicationId": [
                471
            ],
            "createdAt": [
                197
            ],
            "deletedAt": [
                197
            ],
            "icon": [
                1
            ],
            "id": [
                471
            ],
            "isActive": [
                4
            ],
            "isOverridden": [
                4
            ],
            "isSystemSideEffect": [
                4
            ],
            "layoutMode": [
                358
            ],
            "pageLayoutId": [
                471
            ],
            "position": [
                6
            ],
            "title": [
                1
            ],
            "universalIdentifier": [
                471
            ],
            "updatedAt": [
                197
            ],
            "widgets": [
                360
            ],
            "__typename": [
                1
            ]
        },
        "PageLayoutTabLayoutMode": {},
        "PageLayoutType": {},
        "PageLayoutWidget": {
            "applicationId": [
                471
            ],
            "conditionalAvailabilityExpression": [
                1
            ],
            "conditionalDisplay": [
                277
            ],
            "configuration": [
                593
            ],
            "createdAt": [
                197
            ],
            "deletedAt": [
                197
            ],
            "gridPosition": [
                259
            ],
            "id": [
                471
            ],
            "isActive": [
                4
            ],
            "isOverridden": [
                4
            ],
            "isSystemSideEffect": [
                4
            ],
            "objectMetadataId": [
                471
            ],
            "pageLayoutTabId": [
                471
            ],
            "position": [
                363
            ],
            "title": [
                1
            ],
            "type": [
                595
            ],
            "universalIdentifier": [
                471
            ],
            "updatedAt": [
                197
            ],
            "__typename": [
                1
            ]
        },
        "PageLayoutWidgetCanvasPosition": {
            "layoutMode": [
                358
            ],
            "__typename": [
                1
            ]
        },
        "PageLayoutWidgetGridPosition": {
            "column": [
                10
            ],
            "columnSpan": [
                10
            ],
            "layoutMode": [
                358
            ],
            "row": [
                10
            ],
            "rowSpan": [
                10
            ],
            "__typename": [
                1
            ]
        },
        "PageLayoutWidgetPosition": {
            "on_PageLayoutWidgetCanvasPosition": [
                361
            ],
            "on_PageLayoutWidgetGridPosition": [
                362
            ],
            "on_PageLayoutWidgetVerticalListPosition": [
                365
            ],
            "__typename": [
                1
            ]
        },
        "PageLayoutWidgetVerticalListHeightBehavior": {},
        "PageLayoutWidgetVerticalListPosition": {
            "heightBehavior": [
                364
            ],
            "index": [
                10
            ],
            "layoutMode": [
                358
            ],
            "__typename": [
                1
            ]
        },
        "PathCommandMenuItemPayload": {
            "path": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "PermissionFlag": {
            "applicationId": [
                471
            ],
            "createdAt": [
                197
            ],
            "description": [
                1
            ],
            "icon": [
                1
            ],
            "id": [
                471
            ],
            "key": [
                1
            ],
            "label": [
                1
            ],
            "permissionType": [
                1
            ],
            "universalIdentifier": [
                471
            ],
            "updatedAt": [
                197
            ],
            "__typename": [
                1
            ]
        },
        "PermissionFlagType": {},
        "PieChartConfiguration": {
            "aggregateFieldMetadataId": [
                471
            ],
            "aggregateOperation": [
                27
            ],
            "color": [
                1
            ],
            "configurationType": [
                594
            ],
            "dateGranularity": [
                349
            ],
            "description": [
                1
            ],
            "displayDataLabel": [
                4
            ],
            "displayLegend": [
                4
            ],
            "filter": [
                277
            ],
            "firstDayOfTheWeek": [
                10
            ],
            "groupByFieldMetadataId": [
                471
            ],
            "groupBySubFieldName": [
                1
            ],
            "hideEmptyCategory": [
                4
            ],
            "manualSortOrder": [
                1
            ],
            "numberFormat": [
                131
            ],
            "orderBy": [
                258
            ],
            "showCenterMetric": [
                4
            ],
            "splitMultiValueFields": [
                4
            ],
            "timezone": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "PieChartData": {
            "data": [
                372
            ],
            "formattedToRawLookup": [
                277
            ],
            "hasTooManyGroups": [
                4
            ],
            "showCenterMetric": [
                4
            ],
            "showDataLabels": [
                4
            ],
            "showLegend": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "PieChartDataInput": {
            "configuration": [
                277
            ],
            "objectMetadataId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "PieChartDataItem": {
            "key": [
                1
            ],
            "value": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "PlaceDetailsResult": {
            "city": [
                1
            ],
            "country": [
                1
            ],
            "location": [
                289
            ],
            "postcode": [
                1
            ],
            "state": [
                1
            ],
            "street": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "PublicApplicationRegistration": {
            "id": [
                471
            ],
            "logoUrl": [
                1
            ],
            "name": [
                1
            ],
            "oAuthScopes": [
                1
            ],
            "websiteUrl": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "PublicConnectionParametersOutput": {
            "connectionSecurity": [
                218
            ],
            "host": [
                1
            ],
            "port": [
                6
            ],
            "username": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "PublicFeatureFlag": {
            "key": [
                233
            ],
            "metadata": [
                377
            ],
            "__typename": [
                1
            ]
        },
        "PublicFeatureFlagMetadata": {
            "description": [
                1
            ],
            "icon": [
                1
            ],
            "imagePath": [
                1
            ],
            "label": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "PublicImapSmtpCaldavConnectionParameters": {
            "CALDAV": [
                375
            ],
            "IMAP": [
                375
            ],
            "SMTP": [
                375
            ],
            "__typename": [
                1
            ]
        },
        "PublicWorkspaceData": {
            "authBypassProviders": [
                74
            ],
            "authProviders": [
                75
            ],
            "displayName": [
                1
            ],
            "id": [
                471
            ],
            "logo": [
                1
            ],
            "workspaceUrls": [
                616
            ],
            "__typename": [
                1
            ]
        },
        "PublicWorkspaceDataSummary": {
            "displayName": [
                1
            ],
            "id": [
                471
            ],
            "logo": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "Query": {
            "agentChatChannelRoles": [
                8
            ],
            "agentChatChannelSummaries": [
                9
            ],
            "agentChatChannelThreadIds": [
                12,
                {
                    "after": [
                        1
                    ],
                    "assignment": [
                        7
                    ],
                    "channelId": [
                        471,
                        "UUID!"
                    ],
                    "filter": [
                        11
                    ],
                    "first": [
                        10
                    ],
                    "status": [
                        13
                    ]
                }
            ],
            "agentChatChannels": [
                5
            ],
            "agentChatOpenThreadsSummary": [
                16
            ],
            "agentRuns": [
                24,
                {
                    "agentId": [
                        471,
                        "UUID!"
                    ],
                    "limit": [
                        10,
                        "Int!"
                    ]
                }
            ],
            "aiChatUsage": [
                28
            ],
            "aiChatUserCreditsUsage": [
                29
            ],
            "apiKey": [
                37,
                {
                    "input": [
                        256,
                        "GetApiKeyInput!"
                    ]
                }
            ],
            "apiKeys": [
                37
            ],
            "appConnection": [
                40,
                {
                    "id": [
                        18,
                        "ID!"
                    ]
                }
            ],
            "appConnections": [
                40,
                {
                    "filter": [
                        286
                    ]
                }
            ],
            "appKeyValue": [
                41,
                {
                    "key": [
                        1,
                        "String!"
                    ],
                    "scope": [
                        42
                    ]
                }
            ],
            "appMessageChannels": [
                307,
                {
                    "filter": [
                        287
                    ]
                }
            ],
            "appMessageFolders": [
                314,
                {
                    "filter": [
                        288
                    ]
                }
            ],
            "applicationConnectedAccounts": [
                49,
                {
                    "applicationId": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "applicationConnectionProviders": [
                50,
                {
                    "applicationId": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "applicationCoreGraphqlSchema": [
                1,
                {
                    "applicationUniversalIdentifier": [
                        1,
                        "String!"
                    ]
                }
            ],
            "applicationRegistrationTarballUrl": [
                1,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "applicationSdkClientChecksums": [
                419,
                {
                    "applicationId": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "barChartData": [
                86,
                {
                    "input": [
                        87,
                        "BarChartDataInput!"
                    ]
                }
            ],
            "billingPlans": [
                100
            ],
            "billingPortalSession": [
                110,
                {
                    "forPaymentMethodUpdate": [
                        4
                    ],
                    "returnUrlPath": [
                        1
                    ]
                }
            ],
            "callRecordingIdForCalendarEvent": [
                471,
                {
                    "calendarEventId": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "chatMessages": [
                21,
                {
                    "threadId": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "chatStreamCatchupChunks": [
                133,
                {
                    "threadId": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "chatThread": [
                17,
                {
                    "id": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "checkUserExists": [
                136,
                {
                    "captchaToken": [
                        1
                    ],
                    "email": [
                        1,
                        "String!"
                    ]
                }
            ],
            "checkWorkspaceInviteHashIsValid": [
                607,
                {
                    "inviteHash": [
                        1,
                        "String!"
                    ]
                }
            ],
            "checkWorkspaceSubdomainAvailability": [
                441,
                {
                    "subdomain": [
                        1,
                        "String!"
                    ]
                }
            ],
            "commandMenuItem": [
                144,
                {
                    "id": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "commandMenuItems": [
                144
            ],
            "currentUser": [
                565
            ],
            "currentUserApplicationAuthorizations": [
                47
            ],
            "currentUserSessions": [
                568
            ],
            "currentWorkspace": [
                599
            ],
            "enterpriseCheckoutSession": [
                1,
                {
                    "billingInterval": [
                        1
                    ]
                }
            ],
            "enterprisePortalSession": [
                1,
                {
                    "returnUrlPath": [
                        1
                    ]
                }
            ],
            "enterpriseSubscriptionStatus": [
                229
            ],
            "exportApplication": [
                52,
                {
                    "shouldIncludeDependencies": [
                        4
                    ],
                    "universalIdentifier": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "field": [
                234,
                {
                    "id": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "fields": [
                236,
                {
                    "filter": [
                        239,
                        "FieldFilter!"
                    ],
                    "paging": [
                        195,
                        "CursorPaging!"
                    ]
                }
            ],
            "findApplicationRegistrationByClientId": [
                374,
                {
                    "clientId": [
                        1,
                        "String!"
                    ]
                }
            ],
            "findApplicationRegistrationByUniversalIdentifier": [
                65,
                {
                    "universalIdentifier": [
                        1,
                        "String!"
                    ]
                }
            ],
            "findApplicationRegistrationStats": [
                67,
                {
                    "id": [
                        1,
                        "String!"
                    ],
                    "periodEnd": [
                        197
                    ],
                    "periodStart": [
                        197
                    ]
                }
            ],
            "findApplicationRegistrationVariables": [
                69,
                {
                    "applicationRegistrationId": [
                        1,
                        "String!"
                    ]
                }
            ],
            "findClaimableApplicationRegistration": [
                137,
                {
                    "sourcePackage": [
                        1
                    ],
                    "universalIdentifier": [
                        1
                    ]
                }
            ],
            "findInstallApplicationJobStatus": [
                280,
                {
                    "jobId": [
                        1
                    ],
                    "universalIdentifier": [
                        1,
                        "String!"
                    ]
                }
            ],
            "findManyAgents": [
                3
            ],
            "findManyApplicationRegistrations": [
                65
            ],
            "findManyApplications": [
                46
            ],
            "findManyLogicFunctions": [
                290
            ],
            "findManyMarketplaceApps": [
                298,
                {
                    "universalIdentifiers": [
                        1,
                        "[String!]"
                    ]
                }
            ],
            "findMarketplaceAppDetail": [
                299,
                {
                    "universalIdentifier": [
                        1,
                        "String!"
                    ]
                }
            ],
            "findOneAgent": [
                3,
                {
                    "input": [
                        20,
                        "AgentIdInput!"
                    ]
                }
            ],
            "findOneApplication": [
                46,
                {
                    "id": [
                        471
                    ],
                    "universalIdentifier": [
                        471
                    ]
                }
            ],
            "findOneApplicationRegistration": [
                65,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "findOneLogicFunction": [
                290,
                {
                    "input": [
                        294,
                        "LogicFunctionIdInput!"
                    ]
                }
            ],
            "findUninstallApplicationJobStatus": [
                280,
                {
                    "jobId": [
                        1
                    ],
                    "universalIdentifier": [
                        1,
                        "String!"
                    ]
                }
            ],
            "findUpgradeApplicationJobStatus": [
                280,
                {
                    "jobId": [
                        1
                    ],
                    "universalIdentifier": [
                        1,
                        "String!"
                    ]
                }
            ],
            "findWorkspaceAiStats": [
                601
            ],
            "findWorkspaceFromInviteHash": [
                599,
                {
                    "inviteHash": [
                        1,
                        "String!"
                    ]
                }
            ],
            "findWorkspaceInvitations": [
                606
            ],
            "frontComponent": [
                252,
                {
                    "id": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "frontComponents": [
                252
            ],
            "getAddressDetails": [
                373,
                {
                    "placeId": [
                        1,
                        "String!"
                    ],
                    "token": [
                        1,
                        "String!"
                    ]
                }
            ],
            "getAiSystemPromptPreview": [
                31
            ],
            "getApiKeyRoles": [
                404
            ],
            "getApprovedAccessDomains": [
                73
            ],
            "getAutoCompleteAddress": [
                80,
                {
                    "address": [
                        1,
                        "String!"
                    ],
                    "country": [
                        1
                    ],
                    "isFieldCity": [
                        4
                    ],
                    "token": [
                        1,
                        "String!"
                    ]
                }
            ],
            "getAvailablePackages": [
                277,
                {
                    "input": [
                        294,
                        "LogicFunctionIdInput!"
                    ]
                }
            ],
            "getConnectedImapSmtpCaldavAccount": [
                150,
                {
                    "id": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "getInviteSuggestions": [
                276
            ],
            "getJobs": [
                280,
                {
                    "jobIds": [
                        1,
                        "[String!]!"
                    ]
                }
            ],
            "getLogicFunctionSourceCode": [
                1,
                {
                    "input": [
                        294,
                        "LogicFunctionIdInput!"
                    ]
                }
            ],
            "getPageLayout": [
                356,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "getPageLayoutTab": [
                357,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "getPageLayoutTabs": [
                357,
                {
                    "pageLayoutId": [
                        1,
                        "String!"
                    ]
                }
            ],
            "getPageLayoutWidget": [
                360,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "getPageLayoutWidgets": [
                360,
                {
                    "pageLayoutTabId": [
                        1,
                        "String!"
                    ]
                }
            ],
            "getPageLayouts": [
                356,
                {
                    "objectMetadataId": [
                        1
                    ],
                    "pageLayoutType": [
                        359
                    ]
                }
            ],
            "getPermissionFlags": [
                367
            ],
            "getPublicWorkspaceDataByDomain": [
                379,
                {
                    "origin": [
                        1
                    ]
                }
            ],
            "getPublicWorkspaceDataById": [
                380,
                {
                    "id": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "getResourceCreditUsage": [
                109
            ],
            "getRole": [
                404,
                {
                    "id": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "getRoles": [
                404
            ],
            "getToolIndex": [
                453
            ],
            "getToolInputSchema": [
                277,
                {
                    "toolName": [
                        1,
                        "String!"
                    ]
                }
            ],
            "getUsageAnalytics": [
                549,
                {
                    "input": [
                        550
                    ]
                }
            ],
            "getView": [
                576,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "getViewField": [
                579,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "getViewFieldGroup": [
                580,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "getViewFieldGroups": [
                580,
                {
                    "viewId": [
                        1,
                        "String!"
                    ]
                }
            ],
            "getViewFields": [
                579,
                {
                    "viewId": [
                        1,
                        "String!"
                    ]
                }
            ],
            "getViewFilter": [
                581,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "getViewFilterGroup": [
                582,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "getViewFilterGroups": [
                582,
                {
                    "viewId": [
                        1
                    ]
                }
            ],
            "getViewFilters": [
                581,
                {
                    "viewId": [
                        1
                    ]
                }
            ],
            "getViewGroup": [
                585,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "getViewGroups": [
                585,
                {
                    "viewId": [
                        1
                    ]
                }
            ],
            "getViewSort": [
                588,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "getViewSorts": [
                588,
                {
                    "viewId": [
                        1
                    ]
                }
            ],
            "getViews": [
                576,
                {
                    "objectMetadataId": [
                        1
                    ],
                    "viewTypes": [
                        590,
                        "[ViewType!]"
                    ]
                }
            ],
            "getWorkspaceCreationDefaults": [
                604
            ],
            "githubClaimAuthorizationUrl": [
                1,
                {
                    "applicationRegistrationId": [
                        1,
                        "String!"
                    ]
                }
            ],
            "isApplicationStopped": [
                4,
                {
                    "applicationUniversalIdentifier": [
                        1,
                        "String!"
                    ]
                }
            ],
            "lineChartData": [
                282,
                {
                    "input": [
                        283,
                        "LineChartDataInput!"
                    ]
                }
            ],
            "listPlans": [
                100
            ],
            "mcpServer": [
                304,
                {
                    "id": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "mcpServers": [
                304
            ],
            "metadataTranslations": [
                321,
                {
                    "input": [
                        324,
                        "MetadataTranslationsInput!"
                    ]
                }
            ],
            "minimalMetadata": [
                326
            ],
            "mostlyEmptyFieldMetadataIds": [
                471,
                {
                    "objectMetadataId": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "myApplicationPreferences": [
                64
            ],
            "myCalendarChannels": [
                120,
                {
                    "connectedAccountId": [
                        471
                    ]
                }
            ],
            "myConnectedAccounts": [
                148
            ],
            "myMessageChannels": [
                307,
                {
                    "connectedAccountId": [
                        471
                    ]
                }
            ],
            "myMessageFolders": [
                314,
                {
                    "messageChannelId": [
                        471
                    ]
                }
            ],
            "myUserApplicationVariables": [
                609
            ],
            "navigationMenuItem": [
                332,
                {
                    "id": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "navigationMenuItems": [
                332
            ],
            "object": [
                335,
                {
                    "id": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "objectRecordCounts": [
                345
            ],
            "objects": [
                336,
                {
                    "filter": [
                        339,
                        "ObjectFilter!"
                    ],
                    "paging": [
                        195,
                        "CursorPaging!"
                    ]
                }
            ],
            "pieChartData": [
                370,
                {
                    "input": [
                        371,
                        "PieChartDataInput!"
                    ]
                }
            ],
            "publicMarketplaceAppDetail": [
                299,
                {
                    "universalIdentifier": [
                        1,
                        "String!"
                    ]
                }
            ],
            "publicMarketplaceApps": [
                298
            ],
            "recordPermissions": [
                386,
                {
                    "targets": [
                        396,
                        "[RecordTargetInput!]!"
                    ]
                }
            ],
            "recordSharing": [
                391,
                {
                    "target": [
                        396,
                        "RecordTargetInput!"
                    ]
                }
            ],
            "skill": [
                437,
                {
                    "id": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "skills": [
                437
            ],
            "timelineActivityTypes": [
                449
            ],
            "twoFactorAuthenticationRecoveryStatus": [
                470,
                {
                    "userId": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "usageLimits": [
                552
            ],
            "usageQuotaDefinitions": [
                556
            ],
            "usageQuotaScopeConsumption": [
                558,
                {
                    "input": [
                        559,
                        "UsageQuotaScopeInput!"
                    ]
                }
            ],
            "usageQuotasWithConsumption": [
                560
            ],
            "validatePasswordResetToken": [
                571,
                {
                    "passwordResetToken": [
                        1,
                        "String!"
                    ]
                }
            ],
            "validationRules": [
                572,
                {
                    "objectMetadataId": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "webhook": [
                592,
                {
                    "id": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "webhooks": [
                592
            ],
            "__typename": [
                1
            ]
        },
        "RatioAggregateConfig": {
            "fieldMetadataId": [
                471
            ],
            "optionValue": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "RecordExport": {
            "downloadPath": [
                1
            ],
            "errorMessage": [
                1
            ],
            "filename": [
                1
            ],
            "id": [
                471
            ],
            "progress": [
                10
            ],
            "__typename": [
                1
            ]
        },
        "RecordIdentifier": {
            "id": [
                471
            ],
            "imageIdentifier": [
                1
            ],
            "labelIdentifier": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "RecordPermissionsDTO": {
            "canDelete": [
                4
            ],
            "canRead": [
                4
            ],
            "canSoftDelete": [
                4
            ],
            "canUpdate": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "RecordPermissionsResult": {
            "objectMetadataId": [
                471
            ],
            "permissions": [
                385
            ],
            "recordId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "RecordShareAccessLevel": {},
        "RecordSharePrincipalInput": {
            "roleId": [
                471
            ],
            "workspaceMemberId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "RecordSharePrincipalType": {},
        "RecordShareRowCause": {},
        "RecordSharingDTO": {
            "canManageSharing": [
                4
            ],
            "defaultGeneralAccessLevel": [
                387
            ],
            "generalAccessLevel": [
                387
            ],
            "hasManagedGeneralAccess": [
                4
            ],
            "permissions": [
                385
            ],
            "roles": [
                394
            ],
            "shares": [
                392
            ],
            "sharingMode": [
                393
            ],
            "__typename": [
                1
            ]
        },
        "RecordSharingGrantDTO": {
            "accessLevel": [
                387
            ],
            "id": [
                18
            ],
            "principalId": [
                471
            ],
            "principalRoleId": [
                471
            ],
            "principalType": [
                389
            ],
            "rowCause": [
                390
            ],
            "__typename": [
                1
            ]
        },
        "RecordSharingMode": {},
        "RecordSharingRoleDTO": {
            "canRead": [
                4
            ],
            "canUpdate": [
                4
            ],
            "id": [
                471
            ],
            "label": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "RecordTableConfiguration": {
            "configurationType": [
                594
            ],
            "isUIEditable": [
                4
            ],
            "recordLimit": [
                10
            ],
            "viewId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "RecordTargetInput": {
            "objectMetadataId": [
                471
            ],
            "recordId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "Relation": {
            "sourceFieldMetadata": [
                234
            ],
            "sourceObjectMetadata": [
                335
            ],
            "targetFieldMetadata": [
                234
            ],
            "targetObjectMetadata": [
                335
            ],
            "type": [
                398
            ],
            "__typename": [
                1
            ]
        },
        "RelationType": {},
        "RemoveQueryFromEventStreamInput": {
            "eventStreamId": [
                1
            ],
            "queryId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ReportAppConnectionAuthFailureInput": {
            "id": [
                18
            ],
            "reason": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ResendEmailVerificationToken": {
            "success": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "RevokeApiKeyInput": {
            "id": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "RichTextBody": {
            "blocknote": [
                1
            ],
            "markdown": [
                1
            ],
            "tiptap": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "Role": {
            "agents": [
                3
            ],
            "apiKeys": [
                38
            ],
            "applicationId": [
                471
            ],
            "canAccessAllAgentChatChannels": [
                4
            ],
            "canAccessAllTools": [
                4
            ],
            "canBeAssignedToAgents": [
                4
            ],
            "canBeAssignedToApiKeys": [
                4
            ],
            "canBeAssignedToUsers": [
                4
            ],
            "canDestroyAllObjectRecords": [
                4
            ],
            "canReadAllObjectRecords": [
                4
            ],
            "canSoftDeleteAllObjectRecords": [
                4
            ],
            "canUpdateAllObjectRecords": [
                4
            ],
            "canUpdateAllSettings": [
                4
            ],
            "description": [
                1
            ],
            "fieldPermissions": [
                241
            ],
            "icon": [
                1
            ],
            "id": [
                471
            ],
            "isEditable": [
                4
            ],
            "label": [
                1
            ],
            "objectPermissions": [
                343
            ],
            "permissionFlags": [
                405
            ],
            "rowLevelPermissionPredicateGroups": [
                408
            ],
            "rowLevelPermissionPredicates": [
                407
            ],
            "universalIdentifier": [
                471
            ],
            "workspaceMembers": [
                608
            ],
            "__typename": [
                1
            ]
        },
        "RolePermissionFlag": {
            "flag": [
                1
            ],
            "id": [
                471
            ],
            "roleId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "RotateClientSecret": {
            "clientSecret": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "RowLevelPermissionPredicate": {
            "fieldMetadataId": [
                1
            ],
            "id": [
                1
            ],
            "objectMetadataId": [
                1
            ],
            "operand": [
                412
            ],
            "positionInRowLevelPermissionPredicateGroup": [
                6
            ],
            "roleId": [
                1
            ],
            "rowLevelPermissionPredicateGroupId": [
                1
            ],
            "subFieldName": [
                1
            ],
            "value": [
                277
            ],
            "workspaceMemberFieldMetadataId": [
                1
            ],
            "workspaceMemberSubFieldName": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "RowLevelPermissionPredicateGroup": {
            "id": [
                1
            ],
            "logicalOperator": [
                410
            ],
            "objectMetadataId": [
                1
            ],
            "parentRowLevelPermissionPredicateGroupId": [
                1
            ],
            "positionInRowLevelPermissionPredicateGroup": [
                6
            ],
            "roleId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "RowLevelPermissionPredicateGroupInput": {
            "id": [
                471
            ],
            "logicalOperator": [
                410
            ],
            "objectMetadataId": [
                471
            ],
            "parentRowLevelPermissionPredicateGroupId": [
                471
            ],
            "positionInRowLevelPermissionPredicateGroup": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "RowLevelPermissionPredicateGroupLogicalOperator": {},
        "RowLevelPermissionPredicateInput": {
            "fieldMetadataId": [
                471
            ],
            "id": [
                471
            ],
            "operand": [
                412
            ],
            "positionInRowLevelPermissionPredicateGroup": [
                6
            ],
            "rowLevelPermissionPredicateGroupId": [
                471
            ],
            "subFieldName": [
                1
            ],
            "value": [
                277
            ],
            "workspaceMemberFieldMetadataId": [
                1
            ],
            "workspaceMemberSubFieldName": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "RowLevelPermissionPredicateOperand": {},
        "RunAgentInput": {
            "additionalInstructions": [
                1
            ],
            "agentUniversalIdentifier": [
                1
            ],
            "input": [
                415
            ],
            "messages": [
                415
            ],
            "prompt": [
                1
            ],
            "responseFormat": [
                277
            ],
            "runAsWorkspaceMemberId": [
                471
            ],
            "thread": [
                418
            ],
            "waitForCompletion": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "RunAgentMessageAttachmentInput": {
            "fileId": [
                471
            ],
            "filename": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "RunAgentMessageInput": {
            "attachments": [
                414
            ],
            "content": [
                1
            ],
            "role": [
                416
            ],
            "__typename": [
                1
            ]
        },
        "RunAgentMessageRole": {},
        "RunAgentResult": {
            "error": [
                1
            ],
            "result": [
                277
            ],
            "status": [
                1
            ],
            "success": [
                4
            ],
            "threadId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "RunAgentThreadInput": {
            "key": [
                1
            ],
            "title": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "SdkClientChecksums": {
            "core": [
                1
            ],
            "metadata": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "SearchField": {
            "createdAt": [
                197
            ],
            "fieldMetadataId": [
                471
            ],
            "id": [
                471
            ],
            "position": [
                6
            ],
            "tsVectorFieldMetadataId": [
                471
            ],
            "updatedAt": [
                197
            ],
            "__typename": [
                1
            ]
        },
        "SendAppChannelMessageInput": {
            "idempotencyKey": [
                471
            ],
            "messageChannelId": [
                471
            ],
            "messageThreadId": [
                471
            ],
            "text": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "SendAppChannelMessageOutput": {
            "messageId": [
                471
            ],
            "messageThreadId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "SendChatMessageResult": {
            "mentionedParticipantWorkspaceMemberIds": [
                471
            ],
            "messageId": [
                1
            ],
            "queued": [
                4
            ],
            "streamId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "SendEmailAttachmentInput": {
            "id": [
                1
            ],
            "name": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "SendEmailInput": {
            "bcc": [
                1
            ],
            "body": [
                1
            ],
            "cc": [
                1
            ],
            "connectedAccountId": [
                1
            ],
            "draftMessageId": [
                1
            ],
            "files": [
                424
            ],
            "fromHandle": [
                1
            ],
            "inReplyTo": [
                1
            ],
            "subject": [
                1
            ],
            "targetRecord": [
                427
            ],
            "to": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "SendEmailOutput": {
            "error": [
                1
            ],
            "messageThreadId": [
                1
            ],
            "success": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "SendEmailTargetRecordInput": {
            "objectNameSingular": [
                1
            ],
            "recordId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "SendInboxMessageInput": {
            "idempotencyKey": [
                1
            ],
            "text": [
                1
            ],
            "threadKey": [
                1
            ],
            "title": [
                1
            ],
            "toolCall": [
                277
            ],
            "workspaceMemberIds": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "SendInboxMessageResult": {
            "threadId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "SendInvitations": {
            "errors": [
                1
            ],
            "result": [
                606
            ],
            "success": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "Sentry": {
            "dsn": [
                1
            ],
            "environment": [
                1
            ],
            "release": [
                1
            ],
            "tracesSampleRate": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "SetAppKeyValueInput": {
            "key": [
                1
            ],
            "scope": [
                42
            ],
            "value": [
                277
            ],
            "__typename": [
                1
            ]
        },
        "SettingsMenuItem": {
            "applicationId": [
                471
            ],
            "createdAt": [
                197
            ],
            "frontComponentId": [
                471
            ],
            "icon": [
                1
            ],
            "id": [
                471
            ],
            "position": [
                6
            ],
            "scope": [
                434
            ],
            "title": [
                1
            ],
            "universalIdentifier": [
                471
            ],
            "updatedAt": [
                197
            ],
            "__typename": [
                1
            ]
        },
        "SettingsMenuItemScope": {},
        "SignUp": {
            "loginToken": [
                76
            ],
            "workspace": [
                617
            ],
            "__typename": [
                1
            ]
        },
        "SignUpInNewWorkspaceInput": {
            "captchaToken": [
                1
            ],
            "displayName": [
                1
            ],
            "partner": [
                1
            ],
            "subdomain": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "Skill": {
            "applicationId": [
                471
            ],
            "content": [
                1
            ],
            "createdAt": [
                197
            ],
            "description": [
                1
            ],
            "icon": [
                1
            ],
            "id": [
                471
            ],
            "isActive": [
                4
            ],
            "isCustom": [
                4
            ],
            "isSystem": [
                4
            ],
            "label": [
                1
            ],
            "name": [
                1
            ],
            "updatedAt": [
                197
            ],
            "__typename": [
                1
            ]
        },
        "StandaloneRichTextConfiguration": {
            "body": [
                403
            ],
            "configurationType": [
                594
            ],
            "__typename": [
                1
            ]
        },
        "StartWorkspaceSetupChatResult": {
            "outcome": [
                615
            ],
            "thread": [
                17
            ],
            "__typename": [
                1
            ]
        },
        "StopImpersonation": {
            "canRestoreImpersonatorSession": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "SubdomainAvailabilityDTO": {
            "available": [
                4
            ],
            "isValid": [
                4
            ],
            "suggestedSubdomain": [
                1
            ],
            "suggestedSubdomains": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "Subscription": {
            "exportRecords": [
                383,
                {
                    "input": [
                        181,
                        "CreateRecordExportInput!"
                    ]
                }
            ],
            "logicFunctionLogs": [
                295,
                {
                    "input": [
                        296,
                        "LogicFunctionLogsInput!"
                    ]
                }
            ],
            "onAgentChatEvent": [
                14,
                {
                    "threadId": [
                        471,
                        "UUID!"
                    ]
                }
            ],
            "onEventSubscription": [
                230,
                {
                    "eventStreamId": [
                        1,
                        "String!"
                    ]
                }
            ],
            "__typename": [
                1
            ]
        },
        "SubscriptionInterval": {},
        "SubscriptionStatus": {},
        "Support": {
            "supportDriver": [
                446
            ],
            "supportFrontChatId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "SupportDriver": {},
        "SyncAppMessageFoldersInput": {
            "folders": [
                43
            ],
            "messageChannelId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "TasksConfiguration": {
            "configurationType": [
                594
            ],
            "__typename": [
                1
            ]
        },
        "TimelineActivityType": {
            "action": [
                1
            ],
            "applicationId": [
                471
            ],
            "createdAt": [
                197
            ],
            "emit": [
                450
            ],
            "frontComponentUniversalIdentifier": [
                471
            ],
            "icon": [
                1
            ],
            "id": [
                471
            ],
            "isActive": [
                4
            ],
            "label": [
                1
            ],
            "name": [
                1
            ],
            "objectUniversalIdentifier": [
                471
            ],
            "replacesTimelineActivityTypeUniversalIdentifier": [
                471
            ],
            "universalIdentifier": [
                471
            ],
            "updatedAt": [
                197
            ],
            "__typename": [
                1
            ]
        },
        "TimelineActivityTypeEmit": {
            "objectUniversalIdentifier": [
                471
            ],
            "on": [
                1
            ],
            "through": [
                451
            ],
            "__typename": [
                1
            ]
        },
        "TimelineActivityTypeEmitThrough": {
            "happensAtFieldUniversalIdentifier": [
                471
            ],
            "relationFieldUniversalIdentifier": [
                471
            ],
            "triggerFieldUniversalIdentifiers": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "TimelineConfiguration": {
            "configurationType": [
                594
            ],
            "__typename": [
                1
            ]
        },
        "ToolIndexEntry": {
            "category": [
                1
            ],
            "description": [
                1
            ],
            "frontComponentId": [
                1
            ],
            "icon": [
                1
            ],
            "inputSchema": [
                277
            ],
            "label": [
                1
            ],
            "name": [
                1
            ],
            "objectName": [
                1
            ],
            "widgetName": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "TransientToken": {
            "transientToken": [
                76
            ],
            "__typename": [
                1
            ]
        },
        "TriggerAddPeopleToMessageListJobInput": {
            "messageListId": [
                471
            ],
            "personFilter": [
                277
            ],
            "__typename": [
                1
            ]
        },
        "TriggerAddPeopleToMessageListJobResult": {
            "jobId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "TriggerInstallApplicationInput": {
            "universalIdentifier": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "TriggerInstallApplicationJobInput": {
            "universalIdentifier": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "TriggerInstallApplicationJobResult": {
            "jobId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "TriggerInstallApplicationResult": {
            "jobId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "TriggerUninstallApplicationInput": {
            "universalIdentifier": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "TriggerUninstallApplicationJobInput": {
            "universalIdentifier": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "TriggerUninstallApplicationJobResult": {
            "jobId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "TriggerUninstallApplicationResult": {
            "jobId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "TriggerUpgradeApplicationInput": {
            "targetVersion": [
                1
            ],
            "universalIdentifier": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "TriggerUpgradeApplicationResult": {
            "jobId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "TwoFactorAuthenticationMethodSummary": {
            "status": [
                1
            ],
            "strategy": [
                1
            ],
            "twoFactorAuthenticationMethodId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "TwoFactorAuthenticationRecoveryCode": {
            "expiresAt": [
                197
            ],
            "recoveryCode": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "TwoFactorAuthenticationRecoveryCodeRedemption": {
            "provisioningUri": [
                1
            ],
            "tokens": [
                77
            ],
            "__typename": [
                1
            ]
        },
        "TwoFactorAuthenticationRecoveryStatus": {
            "hasVerifiedTwoFactorAuthenticationMethod": [
                4
            ],
            "isAwaitingRecoveryEnrollment": [
                4
            ],
            "pendingRecoveryCodeExpiresAt": [
                197
            ],
            "__typename": [
                1
            ]
        },
        "UUID": {},
        "UUIDFilterComparison": {
            "eq": [
                471
            ],
            "gt": [
                471
            ],
            "gte": [
                471
            ],
            "iLike": [
                471
            ],
            "in": [
                471
            ],
            "is": [
                4
            ],
            "isNot": [
                4
            ],
            "like": [
                471
            ],
            "lt": [
                471
            ],
            "lte": [
                471
            ],
            "neq": [
                471
            ],
            "notILike": [
                471
            ],
            "notIn": [
                471
            ],
            "notLike": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "UpdateAgentChatChannelInput": {
            "color": [
                1
            ],
            "icon": [
                1
            ],
            "name": [
                1
            ],
            "position": [
                6
            ],
            "roleIds": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "UpdateAgentInput": {
            "description": [
                1
            ],
            "icon": [
                1
            ],
            "id": [
                471
            ],
            "isActive": [
                4
            ],
            "label": [
                1
            ],
            "modelConfiguration": [
                277
            ],
            "modelId": [
                1
            ],
            "name": [
                1
            ],
            "prompt": [
                1
            ],
            "responseFormat": [
                277
            ],
            "roleId": [
                471
            ],
            "triggers": [
                277
            ],
            "__typename": [
                1
            ]
        },
        "UpdateApiKeyInput": {
            "expiresAt": [
                1
            ],
            "id": [
                471
            ],
            "name": [
                1
            ],
            "revokedAt": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "UpdateAppMessageChannelInput": {
            "displayName": [
                1
            ],
            "id": [
                471
            ],
            "isSyncEnabled": [
                4
            ],
            "messagingProviderUniversalIdentifier": [
                471
            ],
            "visibility": [
                313
            ],
            "__typename": [
                1
            ]
        },
        "UpdateApplicationInput": {
            "autoUpgrade": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "UpdateApplicationRegistrationInput": {
            "id": [
                1
            ],
            "update": [
                479
            ],
            "__typename": [
                1
            ]
        },
        "UpdateApplicationRegistrationPayload": {
            "name": [
                1
            ],
            "oAuthRedirectUris": [
                1
            ],
            "oAuthScopes": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "UpdateApplicationRegistrationVariableInput": {
            "id": [
                1
            ],
            "update": [
                481
            ],
            "__typename": [
                1
            ]
        },
        "UpdateApplicationRegistrationVariablePayload": {
            "description": [
                1
            ],
            "resetValue": [
                4
            ],
            "value": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "UpdateCalendarChannelInput": {
            "id": [
                471
            ],
            "update": [
                483
            ],
            "__typename": [
                1
            ]
        },
        "UpdateCalendarChannelInputUpdates": {
            "contactAutoCreationPolicy": [
                121
            ],
            "excludePrivateEvents": [
                4
            ],
            "isContactAutoCreationEnabled": [
                4
            ],
            "isSyncEnabled": [
                4
            ],
            "visibility": [
                124
            ],
            "__typename": [
                1
            ]
        },
        "UpdateCommandMenuItemInput": {
            "availabilityObjectMetadataId": [
                471
            ],
            "availabilityType": [
                145
            ],
            "engineComponentKey": [
                222
            ],
            "hotKeys": [
                1
            ],
            "icon": [
                1
            ],
            "id": [
                471
            ],
            "isPinned": [
                4
            ],
            "label": [
                1
            ],
            "pageLayoutId": [
                471
            ],
            "position": [
                6
            ],
            "shortLabel": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "UpdateEmailGroupChannelInput": {
            "displayName": [
                1
            ],
            "id": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "UpdateFieldInput": {
            "defaultValue": [
                277
            ],
            "description": [
                1
            ],
            "icon": [
                1
            ],
            "isActive": [
                4
            ],
            "isAuditLogged": [
                4
            ],
            "isLabelSyncedWithName": [
                4
            ],
            "isNullable": [
                4
            ],
            "isSearchable": [
                4
            ],
            "isSystem": [
                4
            ],
            "isUIEditable": [
                4
            ],
            "isUIReadOnly": [
                4
            ],
            "isUnique": [
                4
            ],
            "label": [
                1
            ],
            "morphRelationsUpdatePayload": [
                277
            ],
            "name": [
                1
            ],
            "objectMetadataId": [
                471
            ],
            "options": [
                277
            ],
            "settings": [
                277
            ],
            "translations": [
                322
            ],
            "universalIdentifier": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "UpdateFrontComponentInput": {
            "id": [
                471
            ],
            "update": [
                488
            ],
            "__typename": [
                1
            ]
        },
        "UpdateFrontComponentInputUpdates": {
            "description": [
                1
            ],
            "name": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "UpdateLabPublicFeatureFlagInput": {
            "publicFeatureFlag": [
                1
            ],
            "value": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "UpdateLogicFunctionFromSourceInput": {
            "id": [
                471
            ],
            "update": [
                491
            ],
            "__typename": [
                1
            ]
        },
        "UpdateLogicFunctionFromSourceInputUpdates": {
            "cronTriggerSettings": [
                277
            ],
            "databaseEventTriggerSettings": [
                277
            ],
            "description": [
                1
            ],
            "handlerName": [
                1
            ],
            "httpRouteTriggerSettings": [
                277
            ],
            "name": [
                1
            ],
            "sourceHandlerCode": [
                1
            ],
            "sourceHandlerPath": [
                1
            ],
            "timeoutSeconds": [
                6
            ],
            "toolTriggerSettings": [
                277
            ],
            "workflowActionTriggerSettings": [
                277
            ],
            "__typename": [
                1
            ]
        },
        "UpdateMcpServerInput": {
            "id": [
                471
            ],
            "update": [
                493
            ],
            "__typename": [
                1
            ]
        },
        "UpdateMcpServerInputUpdates": {
            "connectionProviderId": [
                471
            ],
            "isActive": [
                4
            ],
            "label": [
                1
            ],
            "name": [
                1
            ],
            "url": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "UpdateMessageChannelInput": {
            "id": [
                471
            ],
            "update": [
                495
            ],
            "__typename": [
                1
            ]
        },
        "UpdateMessageChannelInputUpdates": {
            "contactAutoCreationPolicy": [
                308
            ],
            "excludeGroupEmails": [
                4
            ],
            "excludeNonProfessionalEmails": [
                4
            ],
            "isContactAutoCreationEnabled": [
                4
            ],
            "isSyncEnabled": [
                4
            ],
            "messageFolderImportPolicy": [
                315
            ],
            "visibility": [
                313
            ],
            "__typename": [
                1
            ]
        },
        "UpdateMessageFolderInput": {
            "id": [
                471
            ],
            "update": [
                497
            ],
            "__typename": [
                1
            ]
        },
        "UpdateMessageFolderInputUpdates": {
            "isSynced": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "UpdateMessageFoldersInput": {
            "ids": [
                471
            ],
            "update": [
                497
            ],
            "__typename": [
                1
            ]
        },
        "UpdateNavigationMenuItemInput": {
            "color": [
                1
            ],
            "folderId": [
                471
            ],
            "icon": [
                1
            ],
            "link": [
                1
            ],
            "name": [
                1
            ],
            "pageLayoutId": [
                471
            ],
            "position": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "UpdateObjectPayload": {
            "color": [
                1
            ],
            "description": [
                1
            ],
            "icon": [
                1
            ],
            "imageIdentifierFieldMetadataId": [
                471
            ],
            "isActive": [
                4
            ],
            "isLabelSyncedWithName": [
                4
            ],
            "isSearchable": [
                4
            ],
            "labelIdentifierFieldMetadataId": [
                471
            ],
            "labelPlural": [
                1
            ],
            "labelSingular": [
                1
            ],
            "namePlural": [
                1
            ],
            "nameSingular": [
                1
            ],
            "openRecordIn": [
                342
            ],
            "readability": [
                320
            ],
            "sharingReach": [
                350
            ],
            "shortcut": [
                1
            ],
            "translations": [
                322
            ],
            "__typename": [
                1
            ]
        },
        "UpdateOneFieldMetadataInput": {
            "id": [
                471
            ],
            "update": [
                486
            ],
            "__typename": [
                1
            ]
        },
        "UpdateOneNavigationMenuItemInput": {
            "id": [
                471
            ],
            "update": [
                499
            ],
            "__typename": [
                1
            ]
        },
        "UpdateOneObjectInput": {
            "id": [
                471
            ],
            "update": [
                500
            ],
            "__typename": [
                1
            ]
        },
        "UpdatePageLayoutInput": {
            "name": [
                1
            ],
            "objectMetadataId": [
                471
            ],
            "type": [
                359
            ],
            "__typename": [
                1
            ]
        },
        "UpdatePageLayoutTabInput": {
            "icon": [
                1
            ],
            "layoutMode": [
                358
            ],
            "position": [
                6
            ],
            "title": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "UpdatePageLayoutTabWithWidgetsInput": {
            "icon": [
                1
            ],
            "id": [
                471
            ],
            "layoutMode": [
                358
            ],
            "position": [
                6
            ],
            "title": [
                1
            ],
            "widgets": [
                508
            ],
            "__typename": [
                1
            ]
        },
        "UpdatePageLayoutWidgetInput": {
            "conditionalAvailabilityExpression": [
                1
            ],
            "conditionalDisplay": [
                277
            ],
            "configuration": [
                277
            ],
            "isActive": [
                4
            ],
            "objectMetadataId": [
                471
            ],
            "pageLayoutTabId": [
                471
            ],
            "position": [
                277
            ],
            "title": [
                1
            ],
            "type": [
                595
            ],
            "__typename": [
                1
            ]
        },
        "UpdatePageLayoutWidgetWithIdInput": {
            "conditionalAvailabilityExpression": [
                1
            ],
            "conditionalDisplay": [
                277
            ],
            "configuration": [
                277
            ],
            "id": [
                471
            ],
            "objectMetadataId": [
                471
            ],
            "pageLayoutTabId": [
                471
            ],
            "position": [
                277
            ],
            "title": [
                1
            ],
            "type": [
                595
            ],
            "__typename": [
                1
            ]
        },
        "UpdatePageLayoutWithTabsInput": {
            "isFirstTabPinned": [
                4
            ],
            "name": [
                1
            ],
            "objectMetadataId": [
                471
            ],
            "tabs": [
                506
            ],
            "type": [
                359
            ],
            "__typename": [
                1
            ]
        },
        "UpdateRoleInput": {
            "id": [
                471
            ],
            "update": [
                511
            ],
            "__typename": [
                1
            ]
        },
        "UpdateRolePayload": {
            "canAccessAllAgentChatChannels": [
                4
            ],
            "canAccessAllTools": [
                4
            ],
            "canBeAssignedToAgents": [
                4
            ],
            "canBeAssignedToApiKeys": [
                4
            ],
            "canBeAssignedToUsers": [
                4
            ],
            "canDestroyAllObjectRecords": [
                4
            ],
            "canReadAllObjectRecords": [
                4
            ],
            "canSoftDeleteAllObjectRecords": [
                4
            ],
            "canUpdateAllObjectRecords": [
                4
            ],
            "canUpdateAllSettings": [
                4
            ],
            "description": [
                1
            ],
            "icon": [
                1
            ],
            "label": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "UpdateSkillInput": {
            "content": [
                1
            ],
            "description": [
                1
            ],
            "icon": [
                1
            ],
            "id": [
                471
            ],
            "isActive": [
                4
            ],
            "label": [
                1
            ],
            "name": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "UpdateTimelineActivityTypeInput": {
            "icon": [
                1
            ],
            "id": [
                471
            ],
            "isActive": [
                4
            ],
            "label": [
                1
            ],
            "translations": [
                322
            ],
            "__typename": [
                1
            ]
        },
        "UpdateUsageLimitInput": {
            "id": [
                471
            ],
            "payload": [
                184
            ],
            "__typename": [
                1
            ]
        },
        "UpdateValidationRuleInput": {
            "id": [
                471
            ],
            "update": [
                516
            ],
            "__typename": [
                1
            ]
        },
        "UpdateValidationRuleInputUpdates": {
            "description": [
                1
            ],
            "errorFieldMetadataId": [
                471
            ],
            "expression": [
                1
            ],
            "icon": [
                1
            ],
            "isActive": [
                4
            ],
            "message": [
                1
            ],
            "name": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "UpdateViewFieldGroupInput": {
            "id": [
                471
            ],
            "update": [
                518
            ],
            "__typename": [
                1
            ]
        },
        "UpdateViewFieldGroupInputUpdates": {
            "deletedAt": [
                1
            ],
            "isVisible": [
                4
            ],
            "name": [
                1
            ],
            "position": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "UpdateViewFieldInput": {
            "id": [
                471
            ],
            "update": [
                520
            ],
            "__typename": [
                1
            ]
        },
        "UpdateViewFieldInputUpdates": {
            "aggregateOperation": [
                27
            ],
            "isVisible": [
                4
            ],
            "position": [
                6
            ],
            "size": [
                6
            ],
            "viewFieldGroupId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "UpdateViewFilterGroupInput": {
            "id": [
                471
            ],
            "logicalOperator": [
                583
            ],
            "parentViewFilterGroupId": [
                471
            ],
            "positionInViewFilterGroup": [
                6
            ],
            "viewId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "UpdateViewFilterInput": {
            "id": [
                471
            ],
            "update": [
                523
            ],
            "__typename": [
                1
            ]
        },
        "UpdateViewFilterInputUpdates": {
            "fieldMetadataId": [
                471
            ],
            "operand": [
                584
            ],
            "positionInViewFilterGroup": [
                6
            ],
            "relationTargetFieldMetadataId": [
                471
            ],
            "subFieldName": [
                1
            ],
            "value": [
                277
            ],
            "viewFilterGroupId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "UpdateViewGroupInput": {
            "id": [
                471
            ],
            "update": [
                525
            ],
            "__typename": [
                1
            ]
        },
        "UpdateViewGroupInputUpdates": {
            "fieldMetadataId": [
                471
            ],
            "fieldValue": [
                1
            ],
            "isVisible": [
                4
            ],
            "position": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "UpdateViewInput": {
            "anyFieldFilterValue": [
                1
            ],
            "calendarEndFieldMetadataId": [
                471
            ],
            "calendarFieldMetadataId": [
                471
            ],
            "calendarLayout": [
                577
            ],
            "groupLoadLimit": [
                10
            ],
            "icon": [
                1
            ],
            "id": [
                471
            ],
            "isCompact": [
                4
            ],
            "kanbanAggregateOperation": [
                27
            ],
            "kanbanAggregateOperationFieldMetadataId": [
                471
            ],
            "kanbanColumnWidth": [
                10
            ],
            "mainGroupByFieldMetadataId": [
                471
            ],
            "name": [
                1
            ],
            "openRecordIn": [
                587
            ],
            "position": [
                6
            ],
            "shouldHideEmptyGroups": [
                4
            ],
            "translations": [
                322
            ],
            "type": [
                590
            ],
            "visibility": [
                591
            ],
            "__typename": [
                1
            ]
        },
        "UpdateViewSortInput": {
            "id": [
                471
            ],
            "update": [
                528
            ],
            "__typename": [
                1
            ]
        },
        "UpdateViewSortInputUpdates": {
            "direction": [
                589
            ],
            "subFieldName": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "UpdateWebhookInput": {
            "id": [
                471
            ],
            "update": [
                530
            ],
            "__typename": [
                1
            ]
        },
        "UpdateWebhookInputUpdates": {
            "description": [
                1
            ],
            "operations": [
                1
            ],
            "secret": [
                1
            ],
            "targetUrl": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "UpdateWorkspaceAllowedIframeOriginsInput": {
            "operation": [
                1
            ],
            "origin": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "UpdateWorkspaceInput": {
            "aiAdditionalInstructions": [
                1
            ],
            "aiAgentModelTier": [
                30
            ],
            "aiChatModelTier": [
                30
            ],
            "aiEvaluationModelId": [
                1
            ],
            "aiModelIdByTier": [
                277
            ],
            "allowImpersonation": [
                4
            ],
            "defaultRoleId": [
                471
            ],
            "displayName": [
                1
            ],
            "editableProfileFields": [
                1
            ],
            "inviteHash": [
                1
            ],
            "isAutoModelSelectionEnabled": [
                4
            ],
            "isGoogleAuthBypassEnabled": [
                4
            ],
            "isGoogleAuthEnabled": [
                4
            ],
            "isInternalMessagesImportEnabled": [
                4
            ],
            "isMicrosoftAuthBypassEnabled": [
                4
            ],
            "isMicrosoftAuthEnabled": [
                4
            ],
            "isPasswordAuthBypassEnabled": [
                4
            ],
            "isPasswordAuthEnabled": [
                4
            ],
            "isPublicInviteLinkEnabled": [
                4
            ],
            "isTwoFactorAuthenticationEnforced": [
                4
            ],
            "logo": [
                1
            ],
            "subdomain": [
                1
            ],
            "trashRetentionDays": [
                6
            ],
            "workspaceDiscoverability": [
                605
            ],
            "__typename": [
                1
            ]
        },
        "UpdateWorkspaceMemberSettingsInput": {
            "update": [
                277
            ],
            "workspaceMemberId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "Upload": {},
        "UpsertFieldPermissionsInput": {
            "fieldPermissions": [
                242
            ],
            "roleId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "UpsertFieldsWidgetFieldInput": {
            "fieldMetadataId": [
                471
            ],
            "isVisible": [
                4
            ],
            "position": [
                6
            ],
            "viewFieldId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "UpsertFieldsWidgetGroupInput": {
            "fields": [
                536
            ],
            "id": [
                471
            ],
            "isVisible": [
                4
            ],
            "name": [
                1
            ],
            "position": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "UpsertFieldsWidgetInput": {
            "fields": [
                536
            ],
            "groups": [
                537
            ],
            "widgetId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "UpsertObjectPermissionsInput": {
            "objectPermissions": [
                344
            ],
            "roleId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "UpsertPermissionFlagsInput": {
            "permissionFlagKeys": [
                1
            ],
            "roleId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "UpsertRowLevelPermissionPredicatesInput": {
            "objectMetadataId": [
                471
            ],
            "predicateGroups": [
                409
            ],
            "predicates": [
                411
            ],
            "roleId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "UpsertRowLevelPermissionPredicatesResult": {
            "predicateGroups": [
                408
            ],
            "predicates": [
                407
            ],
            "__typename": [
                1
            ]
        },
        "UpsertViewWidgetInput": {
            "view": [
                547
            ],
            "viewFields": [
                544
            ],
            "viewFilterGroups": [
                545
            ],
            "viewFilters": [
                546
            ],
            "viewSorts": [
                548
            ],
            "widgetId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "UpsertViewWidgetViewFieldInput": {
            "aggregateOperation": [
                27
            ],
            "fieldMetadataId": [
                471
            ],
            "isVisible": [
                4
            ],
            "position": [
                6
            ],
            "size": [
                6
            ],
            "viewFieldId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "UpsertViewWidgetViewFilterGroupInput": {
            "id": [
                471
            ],
            "logicalOperator": [
                583
            ],
            "parentViewFilterGroupId": [
                471
            ],
            "positionInViewFilterGroup": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "UpsertViewWidgetViewFilterInput": {
            "fieldMetadataId": [
                471
            ],
            "id": [
                471
            ],
            "operand": [
                584
            ],
            "positionInViewFilterGroup": [
                6
            ],
            "relationTargetFieldMetadataId": [
                471
            ],
            "subFieldName": [
                1
            ],
            "value": [
                277
            ],
            "viewFilterGroupId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "UpsertViewWidgetViewSettingsInput": {
            "calendarEndFieldMetadataId": [
                471
            ],
            "calendarFieldMetadataId": [
                471
            ],
            "calendarLayout": [
                577
            ],
            "kanbanAggregateOperation": [
                27
            ],
            "kanbanAggregateOperationFieldMetadataId": [
                471
            ],
            "kanbanColumnWidth": [
                10
            ],
            "mainGroupByFieldMetadataId": [
                471
            ],
            "openRecordIn": [
                587
            ],
            "shouldHideEmptyGroups": [
                4
            ],
            "type": [
                590
            ],
            "__typename": [
                1
            ]
        },
        "UpsertViewWidgetViewSortInput": {
            "direction": [
                589
            ],
            "fieldMetadataId": [
                471
            ],
            "id": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "UsageAnalytics": {
            "periodEnd": [
                197
            ],
            "periodStart": [
                197
            ],
            "timeSeries": [
                562
            ],
            "usageByApplication": [
                551
            ],
            "usageByModel": [
                551
            ],
            "usageByOperationType": [
                551
            ],
            "usageByUser": [
                551
            ],
            "userDailyUsage": [
                564
            ],
            "__typename": [
                1
            ]
        },
        "UsageAnalyticsInput": {
            "operationTypes": [
                554
            ],
            "periodEnd": [
                197
            ],
            "periodStart": [
                197
            ],
            "userWorkspaceId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "UsageBreakdownItem": {
            "creditsUsed": [
                6
            ],
            "key": [
                1
            ],
            "label": [
                1
            ],
            "userCreditsUsed": [
                6
            ],
            "workspaceCreditsUsed": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "UsageLimit": {
            "burstValue": [
                91
            ],
            "createdAt": [
                197
            ],
            "id": [
                471
            ],
            "limitKind": [
                1
            ],
            "limitValue": [
                91
            ],
            "operationType": [
                554
            ],
            "periodCount": [
                10
            ],
            "periodUnit": [
                1
            ],
            "resourceType": [
                561
            ],
            "spenderId": [
                1
            ],
            "spenderType": [
                1
            ],
            "unit": [
                563
            ],
            "updatedAt": [
                197
            ],
            "__typename": [
                1
            ]
        },
        "UsageLimitOperationDefinition": {
            "allowedUnits": [
                563
            ],
            "operationType": [
                554
            ],
            "__typename": [
                1
            ]
        },
        "UsageOperationType": {},
        "UsageQuotaDefinition": {
            "allowedOperations": [
                553
            ],
            "allowedSpenderTypes": [
                1
            ],
            "limitKind": [
                1
            ],
            "operatorOnlyScopes": [
                557
            ],
            "resourceType": [
                561
            ],
            "__typename": [
                1
            ]
        },
        "UsageQuotaDefinitions": {
            "definitions": [
                555
            ],
            "hasAllowancePeriod": [
                4
            ],
            "isIntraWorkspaceLimitEntitled": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "UsageQuotaOperatorOnlyScope": {
            "operationType": [
                554
            ],
            "periodUnit": [
                1
            ],
            "spenderType": [
                1
            ],
            "unit": [
                563
            ],
            "__typename": [
                1
            ]
        },
        "UsageQuotaScopeConsumption": {
            "consumedValue": [
                91
            ],
            "periodEnd": [
                197
            ],
            "periodStart": [
                197
            ],
            "__typename": [
                1
            ]
        },
        "UsageQuotaScopeInput": {
            "operationType": [
                554
            ],
            "periodUnit": [
                1
            ],
            "resourceType": [
                561
            ],
            "spenderId": [
                1
            ],
            "spenderType": [
                1
            ],
            "unit": [
                563
            ],
            "__typename": [
                1
            ]
        },
        "UsageQuotaWithConsumption": {
            "consumedValue": [
                91
            ],
            "id": [
                471
            ],
            "isEnforced": [
                4
            ],
            "limitValue": [
                91
            ],
            "operationType": [
                554
            ],
            "periodEnd": [
                197
            ],
            "periodStart": [
                197
            ],
            "periodUnit": [
                1
            ],
            "remainingValue": [
                91
            ],
            "resourceType": [
                561
            ],
            "spenderId": [
                1
            ],
            "spenderLabel": [
                1
            ],
            "spenderType": [
                1
            ],
            "unit": [
                563
            ],
            "__typename": [
                1
            ]
        },
        "UsageResourceType": {},
        "UsageTimeSeries": {
            "creditsUsed": [
                6
            ],
            "date": [
                1
            ],
            "workspaceCreditsUsed": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "UsageUnit": {},
        "UsageUserDaily": {
            "dailyUsage": [
                562
            ],
            "userWorkspaceId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "User": {
            "availableWorkspaces": [
                82
            ],
            "canAccessFullAdminPanel": [
                4
            ],
            "canImpersonate": [
                4
            ],
            "createdAt": [
                197
            ],
            "currentUserWorkspace": [
                569
            ],
            "currentWorkspace": [
                599
            ],
            "deletedAt": [
                197
            ],
            "deletedWorkspaceMembers": [
                208
            ],
            "disabled": [
                4
            ],
            "email": [
                1
            ],
            "firstName": [
                1
            ],
            "hasPassword": [
                4
            ],
            "id": [
                471
            ],
            "isEmailVerified": [
                4
            ],
            "isWorkspaceCreator": [
                4
            ],
            "lastName": [
                1
            ],
            "locale": [
                1
            ],
            "onboardingStatus": [
                351
            ],
            "previousOnboardingStatus": [
                351
            ],
            "supportUserHash": [
                1
            ],
            "updatedAt": [
                197
            ],
            "userVars": [
                278
            ],
            "userWorkspaces": [
                569
            ],
            "workspaceMember": [
                608
            ],
            "workspaceMembers": [
                608
            ],
            "workspaces": [
                569
            ],
            "__typename": [
                1
            ]
        },
        "UserApplicationVariableValue": {
            "description": [
                1
            ],
            "isDeprecated": [
                4
            ],
            "isRequired": [
                4
            ],
            "isSecret": [
                4
            ],
            "key": [
                1
            ],
            "label": [
                1
            ],
            "options": [
                277
            ],
            "type": [
                1
            ],
            "value": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "UserCreditsFallback": {},
        "UserSession": {
            "authProvider": [
                1
            ],
            "city": [
                1
            ],
            "country": [
                1
            ],
            "createdAt": [
                197
            ],
            "expiresAt": [
                197
            ],
            "id": [
                471
            ],
            "ipAddress": [
                1
            ],
            "isCurrent": [
                4
            ],
            "isImpersonating": [
                4
            ],
            "lastActiveAt": [
                197
            ],
            "region": [
                1
            ],
            "userAgent": [
                1
            ],
            "workspaceId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "UserWorkspace": {
            "createdAt": [
                197
            ],
            "deletedAt": [
                197
            ],
            "id": [
                471
            ],
            "isImpersonating": [
                4
            ],
            "locale": [
                1
            ],
            "objectPermissions": [
                343
            ],
            "objectsPermissions": [
                343
            ],
            "permissionFlags": [
                368
            ],
            "twoFactorAuthenticationMethodSummary": [
                467
            ],
            "updatedAt": [
                197
            ],
            "user": [
                565
            ],
            "userId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "ValidateApprovedAccessDomainInput": {
            "approvedAccessDomainId": [
                471
            ],
            "validationToken": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ValidatePasswordResetToken": {
            "email": [
                1
            ],
            "hasPassword": [
                4
            ],
            "id": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "ValidationRule": {
            "description": [
                1
            ],
            "errorFieldMetadataId": [
                471
            ],
            "expression": [
                1
            ],
            "icon": [
                1
            ],
            "id": [
                471
            ],
            "isActive": [
                4
            ],
            "message": [
                1
            ],
            "name": [
                1
            ],
            "objectMetadataId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "VerifyEmailAndGetLoginToken": {
            "loginToken": [
                76
            ],
            "workspaceUrls": [
                616
            ],
            "__typename": [
                1
            ]
        },
        "VerifyTwoFactorAuthenticationMethod": {
            "success": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "VersionDistributionEntry": {
            "count": [
                10
            ],
            "version": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "View": {
            "anyFieldFilterValue": [
                1
            ],
            "applicationId": [
                471
            ],
            "calendarEndFieldMetadataId": [
                471
            ],
            "calendarFieldMetadataId": [
                471
            ],
            "calendarLayout": [
                577
            ],
            "createdAt": [
                197
            ],
            "createdByUserWorkspaceId": [
                471
            ],
            "deletedAt": [
                197
            ],
            "groupLoadLimit": [
                10
            ],
            "icon": [
                1
            ],
            "id": [
                471
            ],
            "isActive": [
                4
            ],
            "isCompact": [
                4
            ],
            "isCustom": [
                4
            ],
            "isSystemSideEffect": [
                4
            ],
            "kanbanAggregateOperation": [
                27
            ],
            "kanbanAggregateOperationFieldMetadataId": [
                471
            ],
            "kanbanColumnWidth": [
                10
            ],
            "key": [
                586
            ],
            "mainGroupByFieldMetadataId": [
                471
            ],
            "name": [
                1
            ],
            "objectMetadataId": [
                471
            ],
            "openRecordIn": [
                587
            ],
            "position": [
                6
            ],
            "shouldHideEmptyGroups": [
                4
            ],
            "type": [
                590
            ],
            "universalIdentifier": [
                471
            ],
            "updatedAt": [
                197
            ],
            "viewFieldGroups": [
                580
            ],
            "viewFields": [
                579
            ],
            "viewFilterGroups": [
                582
            ],
            "viewFilters": [
                581
            ],
            "viewGroups": [
                585
            ],
            "viewSorts": [
                588
            ],
            "visibility": [
                591
            ],
            "workspaceId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "ViewCalendarLayout": {},
        "ViewConfiguration": {
            "configurationType": [
                594
            ],
            "__typename": [
                1
            ]
        },
        "ViewField": {
            "aggregateOperation": [
                27
            ],
            "applicationId": [
                471
            ],
            "createdAt": [
                197
            ],
            "deletedAt": [
                197
            ],
            "fieldMetadataId": [
                471
            ],
            "id": [
                471
            ],
            "isActive": [
                4
            ],
            "isOverridden": [
                4
            ],
            "isSystemSideEffect": [
                4
            ],
            "isVisible": [
                4
            ],
            "position": [
                6
            ],
            "size": [
                6
            ],
            "universalIdentifier": [
                471
            ],
            "updatedAt": [
                197
            ],
            "viewFieldGroupId": [
                471
            ],
            "viewId": [
                471
            ],
            "workspaceId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "ViewFieldGroup": {
            "createdAt": [
                197
            ],
            "deletedAt": [
                197
            ],
            "id": [
                471
            ],
            "isActive": [
                4
            ],
            "isOverridden": [
                4
            ],
            "isVisible": [
                4
            ],
            "name": [
                1
            ],
            "position": [
                6
            ],
            "updatedAt": [
                197
            ],
            "viewFields": [
                579
            ],
            "viewId": [
                471
            ],
            "workspaceId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "ViewFilter": {
            "createdAt": [
                197
            ],
            "deletedAt": [
                197
            ],
            "fieldMetadataId": [
                471
            ],
            "id": [
                471
            ],
            "operand": [
                584
            ],
            "positionInViewFilterGroup": [
                6
            ],
            "relationTargetFieldMetadataId": [
                471
            ],
            "subFieldName": [
                1
            ],
            "updatedAt": [
                197
            ],
            "value": [
                277
            ],
            "viewFilterGroupId": [
                471
            ],
            "viewId": [
                471
            ],
            "workspaceId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "ViewFilterGroup": {
            "createdAt": [
                197
            ],
            "deletedAt": [
                197
            ],
            "id": [
                471
            ],
            "logicalOperator": [
                583
            ],
            "parentViewFilterGroupId": [
                471
            ],
            "positionInViewFilterGroup": [
                6
            ],
            "updatedAt": [
                197
            ],
            "viewId": [
                471
            ],
            "workspaceId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "ViewFilterGroupLogicalOperator": {},
        "ViewFilterOperand": {},
        "ViewGroup": {
            "createdAt": [
                197
            ],
            "deletedAt": [
                197
            ],
            "fieldValue": [
                1
            ],
            "id": [
                471
            ],
            "isVisible": [
                4
            ],
            "position": [
                6
            ],
            "updatedAt": [
                197
            ],
            "viewId": [
                471
            ],
            "workspaceId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "ViewKey": {},
        "ViewOpenRecordIn": {},
        "ViewSort": {
            "createdAt": [
                197
            ],
            "deletedAt": [
                197
            ],
            "direction": [
                589
            ],
            "fieldMetadataId": [
                471
            ],
            "id": [
                471
            ],
            "subFieldName": [
                1
            ],
            "updatedAt": [
                197
            ],
            "viewId": [
                471
            ],
            "workspaceId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "ViewSortDirection": {},
        "ViewType": {},
        "ViewVisibility": {},
        "Webhook": {
            "applicationId": [
                471
            ],
            "createdAt": [
                197
            ],
            "deletedAt": [
                197
            ],
            "description": [
                1
            ],
            "id": [
                471
            ],
            "operations": [
                1
            ],
            "secret": [
                1
            ],
            "targetUrl": [
                1
            ],
            "updatedAt": [
                197
            ],
            "__typename": [
                1
            ]
        },
        "WidgetConfiguration": {
            "on_AggregateChartConfiguration": [
                26
            ],
            "on_BarChartConfiguration": [
                85
            ],
            "on_CalendarConfiguration": [
                125
            ],
            "on_CallRecordingSummaryConfiguration": [
                126
            ],
            "on_CallRecordingTranscriptConfiguration": [
                127
            ],
            "on_ChatConfiguration": [
                132
            ],
            "on_ChatThreadsConfiguration": [
                135
            ],
            "on_EmailThreadConfiguration": [
                220
            ],
            "on_EmailsConfiguration": [
                221
            ],
            "on_FieldConfiguration": [
                235
            ],
            "on_FieldRichTextConfiguration": [
                243
            ],
            "on_FieldsConfiguration": [
                244
            ],
            "on_FilesConfiguration": [
                250
            ],
            "on_FormFieldConfiguration": [
                251
            ],
            "on_FrontComponentConfiguration": [
                253
            ],
            "on_IframeConfiguration": [
                260
            ],
            "on_LineChartConfiguration": [
                281
            ],
            "on_MessageCampaignBodyConfiguration": [
                305
            ],
            "on_MessageCampaignDetailsConfiguration": [
                306
            ],
            "on_NotesConfiguration": [
                334
            ],
            "on_PieChartConfiguration": [
                369
            ],
            "on_RecordTableConfiguration": [
                395
            ],
            "on_StandaloneRichTextConfiguration": [
                438
            ],
            "on_TasksConfiguration": [
                448
            ],
            "on_TimelineConfiguration": [
                452
            ],
            "on_ViewConfiguration": [
                578
            ],
            "on_WorkflowConfiguration": [
                596
            ],
            "on_WorkflowRunConfiguration": [
                597
            ],
            "on_WorkflowVersionConfiguration": [
                598
            ],
            "__typename": [
                1
            ]
        },
        "WidgetConfigurationType": {},
        "WidgetType": {},
        "WorkflowConfiguration": {
            "configurationType": [
                594
            ],
            "__typename": [
                1
            ]
        },
        "WorkflowRunConfiguration": {
            "configurationType": [
                594
            ],
            "__typename": [
                1
            ]
        },
        "WorkflowVersionConfiguration": {
            "configurationType": [
                594
            ],
            "__typename": [
                1
            ]
        },
        "Workspace": {
            "activationStatus": [
                600
            ],
            "aiAdditionalInstructions": [
                1
            ],
            "aiAgentModelTier": [
                30
            ],
            "aiChatModelTier": [
                30
            ],
            "aiEvaluationModelId": [
                1
            ],
            "aiModelIdByTier": [
                277
            ],
            "allowImpersonation": [
                4
            ],
            "allowedIframeOrigins": [
                1
            ],
            "billingCustomer": [
                93
            ],
            "billingEntitlements": [
                95
            ],
            "billingSubscriptions": [
                111
            ],
            "createdAt": [
                197
            ],
            "currentBillingSubscription": [
                111
            ],
            "customDomain": [
                1
            ],
            "databaseSchema": [
                1
            ],
            "defaultRole": [
                404
            ],
            "deletedAt": [
                197
            ],
            "displayName": [
                1
            ],
            "editableProfileFields": [
                1
            ],
            "featureFlags": [
                232
            ],
            "hasValidEnterpriseValidityToken": [
                4
            ],
            "hasValidSignedEnterpriseKey": [
                4
            ],
            "id": [
                471
            ],
            "installedApplications": [
                46
            ],
            "inviteHash": [
                1
            ],
            "isAutoModelSelectionEnabled": [
                4
            ],
            "isCustomDomainEnabled": [
                4
            ],
            "isGoogleAuthBypassEnabled": [
                4
            ],
            "isGoogleAuthEnabled": [
                4
            ],
            "isInternalMessagesImportEnabled": [
                4
            ],
            "isMicrosoftAuthBypassEnabled": [
                4
            ],
            "isMicrosoftAuthEnabled": [
                4
            ],
            "isPasswordAuthBypassEnabled": [
                4
            ],
            "isPasswordAuthEnabled": [
                4
            ],
            "isPublicInviteLinkEnabled": [
                4
            ],
            "isTrialAvailable": [
                4
            ],
            "isTwoFactorAuthenticationEnforced": [
                4
            ],
            "logo": [
                1
            ],
            "logoFileId": [
                471
            ],
            "metadataVersion": [
                6
            ],
            "subdomain": [
                1
            ],
            "trashRetentionDays": [
                6
            ],
            "updatedAt": [
                197
            ],
            "viewFields": [
                579
            ],
            "viewFilterGroups": [
                582
            ],
            "viewFilters": [
                581
            ],
            "viewGroups": [
                585
            ],
            "viewSorts": [
                588
            ],
            "views": [
                576
            ],
            "workspaceCustomApplication": [
                46
            ],
            "workspaceCustomApplicationId": [
                1
            ],
            "workspaceDiscoverability": [
                605
            ],
            "workspaceMembersCount": [
                6
            ],
            "workspaceUrls": [
                616
            ],
            "__typename": [
                1
            ]
        },
        "WorkspaceActivationStatus": {},
        "WorkspaceAiStats": {
            "conversationsCount": [
                10
            ],
            "skillsCount": [
                10
            ],
            "toolsCount": [
                10
            ],
            "__typename": [
                1
            ]
        },
        "WorkspaceCompanyEnrichmentOutcome": {},
        "WorkspaceCompanyEnrichmentResult": {
            "enrichment": [
                277
            ],
            "isBookCallOnboardingStepPending": [
                4
            ],
            "outcome": [
                602
            ],
            "personEnrichment": [
                277
            ],
            "personOutcome": [
                614
            ],
            "__typename": [
                1
            ]
        },
        "WorkspaceCreationDefaultsDTO": {
            "displayName": [
                1
            ],
            "subdomain": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "WorkspaceDiscoverability": {},
        "WorkspaceInvitation": {
            "email": [
                1
            ],
            "expiresAt": [
                197
            ],
            "id": [
                471
            ],
            "roleId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "WorkspaceInviteHashValid": {
            "isValid": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "WorkspaceMember": {
            "avatarUrl": [
                1
            ],
            "calendarStartDay": [
                10
            ],
            "colorScheme": [
                1
            ],
            "dateFormat": [
                610
            ],
            "id": [
                471
            ],
            "locale": [
                1
            ],
            "name": [
                255
            ],
            "numberFormat": [
                611
            ],
            "openRecordIn": [
                354
            ],
            "roles": [
                404
            ],
            "timeFormat": [
                612
            ],
            "timeZone": [
                1
            ],
            "uiScale": [
                1
            ],
            "userEmail": [
                1
            ],
            "userId": [
                471
            ],
            "userWorkspaceId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "WorkspaceMemberApplicationVariables": {
            "userWorkspaceId": [
                471
            ],
            "variables": [
                566
            ],
            "workspaceMemberId": [
                471
            ],
            "__typename": [
                1
            ]
        },
        "WorkspaceMemberDateFormatEnum": {},
        "WorkspaceMemberNumberFormatEnum": {},
        "WorkspaceMemberTimeFormatEnum": {},
        "WorkspaceMigration": {
            "actions": [
                277
            ],
            "applicationUniversalIdentifier": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "WorkspacePersonEnrichmentOutcome": {},
        "WorkspaceSetupChatOutcome": {},
        "WorkspaceUrls": {
            "customUrl": [
                1
            ],
            "subdomainUrl": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "WorkspaceUrlsAndId": {
            "id": [
                471
            ],
            "workspaceUrls": [
                616
            ],
            "__typename": [
                1
            ]
        }
    }
}