import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const RegisterEmployee = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    email: '',
    password: '',
    birth_date: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const baseUrl = import.meta.env.VITE_BASE_URL 
  const endPoint = 'user'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { first_name, email, password, birth_date } = formData

    if (!first_name || !email || !password || !birth_date) {
      setError('All fields are required')
      return
    }

    try {
      const response = await fetch(`${baseUrl}${endPoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed')
      }

      setFormData({ first_name: '', email: '', password: '', birth_date: '' })
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="card p-4" style={{ maxWidth: "80%", width: "100%" }}>
        <h2 className="text-center mb-3">Register</h2>
        {error && <div className="alert alert-danger text-center">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <input
              type="date"
              name="birth_date"
              placeholder="Birth Date"
              value={formData.birth_date}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </div>
  )
}
