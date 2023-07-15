import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncWebsocketConsumer



class GraphConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        # self.room_group_name = f"jokes_{self.room_name}"
        self.room_group_name = "chart"
        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name, self.channel_name
        )

        # query_params = parse_qs(self.scope['query_string'].decode())
        # print(query_params)
        # joke

        await self.accept()

    async def disconnect(self):
        await self.channel_layer.group_discard(self.room_group_name,self.channel_name)


    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name, 
            {
                "type": "send_chart_data",
                 "message": message
            }
        )   

    async def send_chart_data(self,event):
        text_message = event['message']
        
        await self.send(text_data=json.dumps(text_message)) 