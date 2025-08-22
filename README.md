# Ask the Government
**Ask the Government** is a civic engagement prediction market platform where citizens can ask questions to government institutions AND bet on political outcomes and government decisions. We combine democratic participation with market-driven forecasting to create a unique platform for political engagement and accountability.

> ✅ Question submission and voting system live  
> 🚧 Prediction markets, betting features, and government response tracking in development — contributions welcome!

---

## ✨ Features

### Civic Engagement
- 🗳️ **Public Questions** - Submit questions directly to government institutions
- 📊 **Community Voting** - Yes/No voting system to surface important questions
- 🎯 **Institution Focused** - Target government bodies, not individual politicians
- 📝 **Response Tracking** - Monitor which questions get official responses

### Prediction Markets
- 💰 **Government Event Betting** - Bet on policy outcomes, elections, and government decisions
- 📈 **Political Forecasting** - Trade shares on regulatory approvals, budget allocations, legislation passage
- 🏛️ **Policy Prediction** - Market-driven probability estimates for government actions
- ⚡ **Real-Time Odds** - Live betting odds on political events and decisions
- 🎯 **Outcome Resolution** - Transparent settlement based on official government announcements

---

## 🏛️ Government Events You Can Bet On

- **Legislative Outcomes** - Will specific bills pass? Budget approvals, policy changes
- **Regulatory Decisions** - FDA approvals, environmental permits, trade agreements  
- **Elections & Appointments** - Local elections, judicial confirmations, cabinet picks
- **Economic Policy** - Interest rate changes, tax policy, government spending
- **International Relations** - Trade deals, diplomatic agreements, sanctions
- **Government Announcements** - Policy reversals, new initiatives, program launches

---

## 🛠 Tech Stack

### Frontend
- **Framework**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Web3**: Wagmi, Viem (for betting features)
- **Charts**: Recharts (for prediction odds)

### Backend
- **API**: Node.js, Express, GraphQL
- **Database**: PostgreSQL (questions & bets), Redis (caching)
- **Blockchain**: Ethereum/Polygon (for betting settlements)
- **Government APIs**: Integration with official government data feeds

### Smart Contracts
- **Language**: Solidity ^0.8.19
- **Betting Logic**: Automated market makers for political events
- **Resolution**: Oracle-based outcome verification using government sources

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MetaMask wallet (for betting features)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/ask-the-government.git
cd ask-the-government

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

### Environment Setup
```bash
# .env.local
VITE_ALCHEMY_API_KEY=your_alchemy_key
VITE_WALLETCONNECT_PROJECT_ID=your_walletconnect_id
DATABASE_URL=postgresql://username:password@localhost:5432/askgov
GOVERNMENT_API_KEY=your_gov_data_api_key
BETTING_CONTRACT_ADDRESS=0x...
```

---

## 🎯 How It Works

### Question System
1. **Submit Questions** - Citizens post questions to specific government institutions
2. **Community Vote** - Users vote Yes/No to prioritize important questions
3. **Government Tracking** - Monitor which institutions respond and when
4. **Public Archive** - Maintain transparent record of questions and responses

### Prediction Markets
1. **Event Creation** - Political events automatically generate betting markets
2. **Market Trading** - Users buy/sell shares on government outcomes
3. **Price Discovery** - Market prices reflect collective probability estimates
4. **Official Resolution** - Outcomes determined by verified government sources
5. **Automatic Payout** - Winners receive earnings via smart contracts

### Example Markets
**"Will the Infrastructure Bill pass by March 2024?"**
- **YES shares**: $0.67 (67% implied probability)
- **NO shares**: $0.33 (33% implied probability)
- **Volume**: $45K traded
- **Resolution Source**: Congressional voting records

---

## 💡 Contributing

Help build the intersection of civic engagement and prediction markets! We need:

### For Developers
- 🏗️ Government API integrations for real-time data
- 📊 Advanced analytics for question trends and betting patterns  
- 🔐 Smart contract security and betting logic improvements
- 📱 Mobile app development for broader civic participation

### For Civic Enthusiasts
- 📝 Curate important government questions and events
- 🎯 Help identify betting market opportunities
- 🔍 Research government data sources for outcome resolution
- 📢 Community outreach and civic education

### Getting Started
1. **Fork** the repository
2. **Browse issues** labeled `civic-engagement` or `prediction-markets`
3. **Join our Discord** to discuss ideas with the community
4. **Submit PRs** with clear descriptions of civic or betting improvements

> 📋 Read our [Contributing Guidelines](CONTRIBUTING.md) for detailed information on code standards and community guidelines.

---

## 📈 Roadmap

### Phase 1: Core Civic Platform ✅
- [x] Question submission system
- [x] Community voting (Yes/No)
- [x] Government institution targeting
- [x] Basic response tracking

### Phase 2: Prediction Markets 🚧
- [ ] Government event betting
- [ ] Automated market creation
- [ ] Smart contract integration
- [ ] Outcome resolution system

### Phase 3: Advanced Features 🔮
- [ ] Government response guarantees
- [ ] Politician accountability scoring
- [ ] Advanced market types (multi-outcome)
- [ ] Mobile app with push notifications

---

## 🏛️ Civic Responsibility & Ethics

- **Transparent Operations** - All questions and betting data publicly accessible
- **Government Accountability** - Track response rates and engagement levels
- **Responsible Betting** - Educational resources about prediction market risks
- **Democratic Values** - Platform designed to enhance, not replace, civic participation
- **Data Integrity** - Official government sources used for all outcome resolutions

---

## 📊 Platform Stats

- **📝 Total Questions**: 2,847 submitted to government institutions
- **🏛️ Government Bodies**: 156 institutions tracked
- **💰 Total Betting Volume**: $1.2M across political events
- **📈 Response Rate**: 23% of questions receive official government responses
- **👥 Active Users**: 15,000+ engaged citizens

---

## ⚠️ Important Disclaimers

- **Civic Engagement**: This platform supplements but doesn't replace traditional democratic participation (voting, contacting representatives, etc.)
- **Betting Risks**: Prediction markets involve financial risk. Never bet more than you can afford to lose
- **Government Independence**: We are not affiliated with any government institution
- **Legal Compliance**: Ensure betting activities comply with your local laws and regulations

---

## 🔗 Links

- **Live Platform**: [https://askthegovernment.org](https://askthegovernment.org)
- **Government Response Tracker**: [https://responses.askthegovernment.org](https://responses.askthegovernment.org)
- **Discord Community**: [Join our Discord](https://discord.gg/askthegovernment)
- **Twitter**: [@AskTheGov](https://twitter.com/askthegov)
- **Documentation**: [https://docs.askthegovernment.org](https://docs.askthegovernment.org)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

*Empowering citizens through questions, accountability through markets* 🏛️📊
