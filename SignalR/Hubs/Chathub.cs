using Microsoft.AspNetCore.SignalR;
using SignalR.Models;
using System.Web.Http.Cors;

namespace ChatService.Hubs
{
    public class Chathub : Hub
    {
        private readonly string _botUser;

        public Chathub()
        {
            _botUser = "MyChat Bot";
        }

        public async Task JoinRoom(UserConnection userConnection)
        {
            //Grouping Users to Groups(Room)
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);
            //Sending Message from Boot
            await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", _botUser, $"{userConnection.User} has joined {userConnection.Room}");
        }
    }
}
