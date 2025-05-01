using Microsoft.AspNetCore.SignalR;

namespace backend.Hubs
{
    public class NotificationHub : Hub
    {
        public async Task NotifyAll(string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", message);
        }
    }

}
