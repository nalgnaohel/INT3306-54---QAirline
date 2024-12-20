package http

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
	"github.com/google/uuid"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/auth"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/models"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/pkg/utils"
)

type authHandlers struct {
	authBusiness auth.AuthBusiness
}

// NewAuthHandlers - creates a new auth handlers
func NewAuthHandlers(authBusiness auth.AuthBusiness) auth.Handlers {
	return &authHandlers{
		authBusiness: authBusiness,
	}
}

// Register - creates a new user Handler
func (authHandlers *authHandlers) Register() fiber.Handler {
	return func(c *fiber.Ctx) error {
		userId := uuid.New().String()

		user := &models.User{
			UserID: userId,
			Type:   "client",
		}

		if user.Email == "lanlehoang8124@gmail.com" {
			user.Type = "admin"
		}

		if err := c.BodyParser(user); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"status": "Bad Request",
				"error":  "!!!!!!Cannot parse - " + err.Error(),
			})
		}

		err := utils.NewValidator().Validate(user)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"status": "Bad Request",
				"error":  "Invalid -- " + err.Error(),
			})
		}

		newTokenedUser, err := authHandlers.authBusiness.Register(user)
		if err != nil {
			log.Error("authHandlers.Register %e", err)
			return c.Status(fiber.StatusInternalServerError).JSON(&fiber.Map{
				"status": "Internal Server Error",
				"error":  "QQ gi k biet -- " + err.Error(),
			})
		}

		return c.Status(fiber.StatusCreated).JSON(&fiber.Map{
			"status": "Created",
			"user":   &newTokenedUser,
			"err":    err,
		})
	}
}

// Login - logs in a user Handler
func (authHandlers *authHandlers) Login() fiber.Handler {
	type Login struct {
		Email    string `json:"email" validate:"required,email"`
		Password string `json:"password" validate:"required"`
	}
	return func(c *fiber.Ctx) error {
		login := &Login{}

		if err := c.BodyParser(login); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"status": "Bad Request parser",
				"error":  err.Error(),
			})
		}

		err := utils.NewValidator().Validate(login)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"status":  "Bad Request - Validation Error",
				"message": err.Error(),
			})
		}

		//Check if user exists
		_, err = authHandlers.authBusiness.GetByEmail(login.Email)
		if err != nil {
			log.Error("authHandlers.Login.UserNotFound %e", err)
			return c.Status(fiber.StatusInternalServerError).JSON(&fiber.Map{
				"status":  "User not found",
				"message": err.Error(),
			})
		}

		tokenedUser, err := authHandlers.authBusiness.Login(login.Email, login.Password)
		if err != nil {
			log.Error("authHandlers.Login.ServerError %e", err)
			return c.Status(fiber.StatusInternalServerError).JSON(&fiber.Map{
				"status":  "Internal Server Error!!!!!!!!!!!!!!",
				"message": err.Error(),
			})
		}

		return c.Status(fiber.StatusOK).JSON(&fiber.Map{
			"status": "OK",
			"user":   &tokenedUser,
		})
	}
}

// Logout - logs out a user Handler
func (authHandlers *authHandlers) Logout() fiber.Handler {
	panic("implement me")
}

// Update - updates a user Handler
func (authHandlers *authHandlers) Update() fiber.Handler {
	// return func(c *fiber.Ctx) error {
	// 	//userID, err := uuid.Parse(c.Params("user_id"))
	// 	if err != nil {
	// 		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
	// 			"status":  "Bad Request. UserID is not valid!",
	// 			"message": err.Error(),
	// 		})
	// 	}

	// 	user := &models.User{}
	// 	//user.UserID = userID

	// 	if err := c.BodyParser(user); err != nil {
	// 		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
	// 			"status":  "Bad Request",
	// 			"message": err.Error(),
	// 		})
	// 	}

	// 	// userLocals := c.Locals("user").(*models.User)
	// 	// if &userLocals.Type != "admin" {
	// 	// 	if *&userLocals.Type == *&user.Type {
	// 	// 		log.Error("authHandlers.Update.Query", err)
	// 	// 		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
	// 	// 			"status":  "Bad Request. Can't update staff role by user",
	// 	// 			"message": err.Error(),
	// 	// 		})
	// 	// 	}
	// 	// }

	// 	updatedUser, err := authHandlers.authBusiness.Update(user)
	// 	if err != nil {
	// 		log.Error("authHandlers.Update.Query", err)
	// 		return c.Status(fiber.StatusInternalServerError).JSON(&fiber.Map{
	// 			"status":  "Internal Server Error",
	// 			"message": err.Error(),
	// 		})
	// 	}

	// 	return c.Status(fiber.StatusOK).JSON(&fiber.Map{
	// 		"status": "success",
	// 		"data":   &updatedUser,
	// 	})
	// }
	panic("implement me")
}

// Delete - deletes a user Handler
func (authHandlers *authHandlers) Delete() fiber.Handler {
	return func(c *fiber.Ctx) error {
		userID, err := uuid.Parse(c.Params("user_id"))
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"status":  "Bad Request. UserID is not valid!",
				"message": err.Error(),
			})
		}

		// user := &models.User{}
		// user.UserID = userID.String()

		// userLocals := c.Locals("user").(*models.User)
		// if *&userLocals.Type != "admin" {
		// 	if *&userLocals.Type == *&user.Type {
		// 		log.Error("authHandlers.Delete.Query", err)
		// 		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
		// 			"status":  "Bad Request. User cant delete user",
		// 			"message": err.Error(),
		// 		})
		// 	}
		// }

		err = authHandlers.authBusiness.Delete(userID)
		if err != nil {
			log.Error("authHandlers.Delete.Query", err)
			return c.Status(fiber.StatusInternalServerError).JSON(&fiber.Map{
				"status":  "Internal Server Error - Delete user",
				"message": err.Error(),
			})
		}

		return c.Status(fiber.StatusOK).JSON(&fiber.Map{
			"status": "success",
			"data":   "User deleted",
		})

	}
	//panic("implement me")
}

// GetByID - gets a user by ID Handler
func (authHandlers *authHandlers) GetByID() fiber.Handler {
	return func(c *fiber.Ctx) error {
		userID, err := uuid.Parse(c.Params("user_id"))
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"status":  "Bad Request. UserID is not valid!",
				"message": err.Error(),
			})
		}

		user, err := authHandlers.authBusiness.GetByID(userID)
		if err != nil {
			log.Error("authHandlers.GetByID.Query", err)
			return c.Status(fiber.StatusInternalServerError).JSON(&fiber.Map{
				"status":  "Internal Server Error",
				"message": err.Error(),
			})
		}

		return c.Status(fiber.StatusOK).JSON(&fiber.Map{
			"status": "success",
			"data":   user,
		})
	}
}

// GetAll - gets all users Handler
func (authHandlers *authHandlers) GetAll() fiber.Handler {
	panic("implement me")
}

// GetByEmail - gets a user by email Handler
func (authHandlers *authHandlers) GetByEmail() fiber.Handler {
	return func(c *fiber.Ctx) error {
		email := c.Params("email")

		user, err := authHandlers.authBusiness.GetByEmail(email)
		if err != nil {
			log.Error("authHandlers.GetByEmail.Query", err)
			return c.Status(fiber.StatusInternalServerError).JSON(&fiber.Map{
				"status":  "Internal Server Error",
				"message": err.Error(),
			})
		}

		return c.Status(fiber.StatusOK).JSON(&fiber.Map{
			"status": "success",
			"data":   user,
		})
	}
}

// ChangePassword - changes a user's password Handler
func (authHandlers *authHandlers) ChangePassword() fiber.Handler {
	return func(c *fiber.Ctx) error {
		userID, err := uuid.Parse(c.Params("user_id"))
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"status":  "Bad Request - Invalid UserID",
				"message": err.Error(),
			})
		}

		type ChangePassword struct {
			OldPassword string `json:"old_password" validate:"required,min=8"`
			NewPassword string `json:"new_password" validate:"required,min=8"`
		}

		changePassword := &ChangePassword{}

		if err := c.BodyParser(changePassword); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"status":  "Bad Request - error parse change pass",
				"message": err.Error(),
			})
		}

		updatedUser, err := authHandlers.authBusiness.ChangePassword(userID, changePassword.OldPassword, changePassword.NewPassword)
		if err != nil {
			log.Error("authHandlers.ChangePassword.Query", err)
			return c.Status(fiber.StatusInternalServerError).JSON(&fiber.Map{
				"status":  "Internal Server Error - Change Pass",
				"message": err.Error(),
			})
		}

		return c.Status(fiber.StatusOK).JSON(&fiber.Map{
			"status": "success",
			"data":   &updatedUser,
		})
	}
}
