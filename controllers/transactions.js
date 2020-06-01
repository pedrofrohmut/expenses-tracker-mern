const Transaction = require("../models/Transaction")

// @Desc GET All Transactions
// @Route GET /api/v1/transactions
// @Access Public
exports.getTransactions = async (request, response, next) => {
  try {
    const transactions = await Transaction.find()
    return response.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    })
  } catch (err) {
    response.status(500).json({
      success: false,
      error: "Server Error"
    })
  }
}

// @Desc Add Transaction
// @Route POST /api/v1/transactions
// @Access Public
exports.addTransaction = async (request, response, next) => {
  const { text, amount } = request.body
  try {
    const transaction = await Transaction.create(request.body)
    return response.status(201).json({
      success: true,
      data: transaction
    })
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map(
        (error) => `${error.path}: ${error.message}`
      )
      return response.status(400).json({
        success: false,
        messages
      })
    } else {
      return response.status(500).json({
        success: false,
        message: "Transaction could not be created"
      })
    }
  }
}

// @Desc Delete All Transaction
// @Route DELETE /api/v1/transactions/:id
// @Access Public
exports.deleteTransaction = async (request, response, next) => {
  try {
    const transaction = await Transaction.findById(request.params.id)
    if (!transaction) {
      return response.status(404).json({
        success: false,
        error: "No transaction found"
      })
    }
    await transaction.remove()
    response.status(200).json({
      success: true,
      message: "Transaction Removed"
    })
  } catch (err) {
    console.log(err)
    return response.status(500).json({
      success: false,
      message: "Transaction could not be Deleted"
    })
  }
}
