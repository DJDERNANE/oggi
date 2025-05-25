import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
  
  export function PaginationDemo({
    pagination,
    onPageChange,
  }: {
    pagination: any,
    onPageChange: (page: number) => void,
  }) {
    const { current_page, last_page } = pagination;
    console.log("current page " + JSON.stringify(pagination) )
    const renderPages = () => {
      const pages = [];
      for (let i = 1; i <= last_page; i++) {
        if (
          i === 1 ||
          i === last_page ||
          (i >= current_page - 1 && i <= current_page + 1)
        ) {
          pages.push(
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                isActive={i === current_page}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(i);
                }}
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          );
        } else if (
          i === current_page - 2 ||
          i === current_page + 2
        ) {
          pages.push(<PaginationItem key={`ellipsis-${i}`}><PaginationEllipsis /></PaginationItem>);
        }
      }
      return pages;
    };
  
    return (
      <Pagination className="w-min">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (current_page > 1) onPageChange(current_page - 1);
              }}
            />
          </PaginationItem>
          {renderPages()}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (current_page < last_page) onPageChange(current_page + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  }
  
  