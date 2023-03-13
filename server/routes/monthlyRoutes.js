const Monthly = require('./models/monthly');

app.get('/monthly', async (req, res) => {
    try {
      const monthly = await Monthly.find();
      res.json(monthly);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

  app.get('/monthly/:id', getMonthly, (req, res) => {
    res.json(res.monthly);
  });
  
  async function getMonthly(req, res, next) {
    let monthly;
    try {
      monthly = await Monthly.findById(req.params.id);
      if (monthly == null) {
        return res.status(404).json({ message: 'Cannot find monthly record' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  
    res.monthly = monthly;
    next();
  }
  


  app.post('/monthly', async (req, res) => {
    const monthly = new Monthly({
      id: req.body.id,
      Monthly_Expenses: req.body.Monthly_Expenses,
      Monthly_Income: req.body.Monthly_Income,
      Monthly_Savings: req.body.Monthly_Savings,
      Monthly_Balance: req.body.Monthly_Balance,
    });
  
    try {
      const newMonthly = await monthly.save();
      res.status(201).json(newMonthly);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  



  app.patch('/monthly/:id', getMonthly, async (req, res) => {
    if (req.body.Monthly_Expenses != null) {
      res.monthly.Monthly_Expenses = req.body.Monthly_Expenses;
    }
  
    if (req.body.Monthly_Income != null) {
      res.monthly.Monthly_Income = req.body.Monthly_Income;
    }
  
    if (req.body.Monthly_Savings != null) {
      res.monthly.Monthly_Savings = req.body.Monthly_Savings;
    }
  
    if (req.body.Monthly_Balance != null) {
      res.monthly.Monthly_Balance = req.body.Monthly_Balance;
    }
  
    try {
      const updatedMonthly = await res.monthly.save();
      res.json(updatedMonthly);
  
  
    } catch (err) {
        res.status(400).json({ message: err.message });
      }
    });
    