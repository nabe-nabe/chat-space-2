json.user_name @message.user.name
json.created_at @message.created_at.strftime("%Y/%m/%d(#{%w(日 月 火 水 木 金 土)[Time.now.wday]}) %H:%M")
json.content @message.content
json.image @message.image_url