package utils

import (
	"fmt"
	"math"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

// Display by paging size
type PagingQuery struct {
	Size    int    `json:"size,omitempty"`
	Page    int    `json:"page,omitempty"`
	OrderBy string `json:"orderBy,omitempty"`
}

// SetSize Set page size
func (q *PagingQuery) SetQuerySize(sizeQuery string) error {
	if sizeQuery == "" {
		q.Size = 2
		return nil
	}
	n, err := strconv.Atoi(sizeQuery)
	if err != nil {
		return err
	}
	q.Size = n

	return nil
}

// SetPage Set page number
func (q *PagingQuery) SetPage(pageQuery string) error {
	if pageQuery == "" {
		q.Size = 0
		return nil
	}
	n, err := strconv.Atoi(pageQuery)
	if err != nil {
		return err
	}
	q.Page = n

	return nil
}

// SetOrderBy Set order by
func (q *PagingQuery) SetOrderBy(orderByQuery string) {
	q.OrderBy = orderByQuery
}

// GetOffset Get offset
func (q *PagingQuery) GetOffset() int {
	if q.Page == 0 {
		return 0
	}
	return (q.Page - 1) * q.Size
}

// GetLimit Get limit
func (q *PagingQuery) GetQuerySize() int {
	return q.Size
}

// GetOrderBy Get OrderBy
func (q *PagingQuery) GetOrderBy() string {
	return q.OrderBy
}

// GetPage Get OrderBy
func (q *PagingQuery) GetPage() int {
	return q.Page
}

func (q *PagingQuery) GetQueryString() string {
	return fmt.Sprintf("page=%v&size=%v&orderBy=%s", q.GetPage(), q.GetQuerySize(), q.GetOrderBy())
}

// GetPaginationFromCtx Get pagination query struct from
func GetPaginationFromCtx(c *fiber.Ctx) (*PagingQuery, error) {
	q := &PagingQuery{}
	if err := q.SetPage(c.Query("page")); err != nil {
		return nil, err
	}
	if err := q.SetQuerySize(c.Query("size")); err != nil {
		return nil, err
	}
	q.SetOrderBy(c.Query("orderBy"))

	return q, nil
}

// GetTotalPages Get total pages int
func GetTotalPages(totalCount int, pageSize int) int {
	d := float64(totalCount) / float64(pageSize)
	return int(math.Ceil(d))
}

// GetHasMore Get has more
func GetHasMore(currentPage int, totalCount int, pageSize int) bool {
	return currentPage < totalCount/pageSize
}
