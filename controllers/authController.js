import bcrypt from 'bcryptjs'


import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// SIGNUP CONTROLLER
export const signup = async (req, res) => {
  try {

    const { name, email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
      name,
      email,
      password: hashedPassword,
    })

    await user.save()

    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

// SIGNIN CONTROLLER
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid email' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' })
    }

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.name,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    res.cookie('token', token, {
      httpOnly: true,
      secure: false, 
      sameSite: 'lax',
      maxAge: 24*60*60*1000,
    })

    res.json({
      message: 'Signin successful'
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })

  res.json({ message: 'Logged out successfully' })
}


export const getMe = (req, res) => {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({ loggedIn: false })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) // jwt.verify() will return decoded payload of token
    
    return res.json({
      loggedIn: true,
      user: {
        id: decoded.userId,
        name: decoded.username,
        email: decoded.email,
      },
    })
  } catch (error) {
    return res.status(401).json({ loggedIn: false })
  }
}
