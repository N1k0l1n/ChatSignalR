using Microsoft.AspNetCore.SignalR;
using SignalR.Models;
using System.Web.Http.Cors;

namespace ChatService.Hubs
{
    public class Chathub : Hub
    {
        private readonly string _botUser;
        private readonly IDictionary<string, UserConnection> _connections;

        public Chathub(IDictionary<string, UserConnection> connections)
        {
            _botUser = "MyChat Bot";
            _connections = connections;
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                _connections.Remove(Context.ConnectionId);
                Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", _botUser, $"{userConnection.User} has left");

            }

            return base.OnDisconnectedAsync(exception);
        }

        //Send Message method
        public async Task SendMessage(string message)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                await Clients.Groups(userConnection.Room).SendAsync("ReceiveMessage", userConnection.User, message);
            }
        }

        public async Task JoinRoom(UserConnection userConnection)
        {
            //Grouping Users to Groups(Room)
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);

            //When User Rejoints
            _connections[Context.ConnectionId] = userConnection;

            //Sending Message from Boot
            await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", _botUser, $"{userConnection.User} has joined {userConnection.Room}");
        }
    }
}
