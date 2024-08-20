import { Telegraf } from 'telegraf';

// Replace 'YOUR_TELEGRAM_BOT_TOKEN' with your actual bot token
const token = '7246266759:AAFg21RHSsRX2EEDsQUKoNxIGvhLJSqWzcg';

// Error handling (highly recommended)
const bot = new Telegraf(token, {
  polling: true,
});

// Command handling (using Telegraf's command structure)
bot.command('start', async (ctx) => {
  const userName = ctx.from.first_name;
  const welcomeMessage = `🎉 Welcome to MemeLord, ${userName}! 🎉\n\nTap the button below to get started and earn rewards! \n\nYour Telegram ID: ${ctx.from.id} \n Click the Meme tap to start earning`;
  
  await ctx.reply(welcomeMessage, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '🔝 Tap to visit Site', callback_data: 'tap' },
        ],
      ],
    },
  });
});

// Automatically handle the /tap command
bot.command('tap', async (ctx) => {
  const messageId = ctx.message.message_id;
  await ctx.answerCbQuery(); // Acknowledge callback query if necessary
  await ctx.reply('🤑 Great! You have successfully tapped the button.');
  
  // Simulate the tap action
  const link = 'https://memelord.live'; // Replace with your actual link
  await ctx.reply(`🤑 Great! Click the link below to proceed: \n\n${link}`, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '👉 Go to Link', url: link },
        ],
      ],
    },
  });
});


// Handle callback queries from inline buttons
bot.on('callback_query', async (ctx) => {
  const action = ctx.callbackQuery.data;

  if (action === 'tap') {
    await ctx.answerCbQuery();
    const link = 'https://memelord.live';
    await ctx.reply(`🤑 You have tapped the button! Click the link below to visit our site: \n\n${link}`, {
      reply_markup: {
        inline_keyboard: [
          [
            { text: '👉 Go to Link', url: link },
          ],
        ],
      },
    });
  }
});

// Handle text messages (more generic handling with error logging)
bot.on('text', async (ctx) => {
  try {
    const message = ctx.message.text;
    console.log('Received text message:', message); // Log received messages

    // Add logic for handling other text messages or commands here
    // Example: If the message starts with a specific keyword
    if (message.startsWith('/')) {
      const command = message.slice(1); // Extract the command (without '/')
      // Handle custom commands here
      // ... handle commands based on 'command' variable ...
    }

  } catch (error) {
    console.error('Error handling text message:', error);
    // Handle errors gracefully, consider sending error messages to admins or logging
  }
});

// Start the bot
bot.launch();

console.log('Bot is running...');
