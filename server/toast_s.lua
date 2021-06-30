--SENDS a message
AddEventHandler('HRP:SENDMESSAGE', function(user, MainMsg, chan)
	TriggerClientEvent('chatMessage', -1, user, {222, 199, 132}, MainMsg)
	TriggerEvent('HRP:SENTMESSAGE', user, MainMsg, chan)
end)


--kick command
AddEventHandler('HRP:KICKREQUEST', function(userid, reason, chan)	
	local username = '';
	local notfound = 'Not Found';
	for _, playerId in ipairs(GetPlayers()) do
		if(userid == playerId) then
			userid = playerId
			username = GetPlayerName(userid)
			notfound = 'Found'
		end
	end
	TriggerEvent('HRP:SENDKICK', userid, reason, notfound, username, chan)
end)


--get all the players in the server
AddEventHandler('HRP:GETPLAYERS', function(channel)
	local  playeramount = 'No players are online -_-'
	local num = 0;
	local players = ''
	for _, ID in ipairs(GetPlayers()) do
		if tonumber(ID) < 20 then
			ID = '0' .. tostring(ID)
		end
		players = players .. '\n' .. ID .. '   |   ' .. GetPlayerName(ID)
		num = num + 1;
	end
    TriggerEvent('HRP:SENDPLAYERS', players, num, channel)
end)

