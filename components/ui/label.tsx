
"use client"

import * as React from "react"
import { cn } from "cn"

/**
 * Component Label (Nhãn văn bản):
 * Dùng để hiển thị tiêu đề cho các ô nhập liệu (input) như "Họ và tên", "Email", "Mật khẩu".
 * Tự động đồng bộ kiểu chữ, khoảng cách và trạng thái vô hiệu hóa (disabled) của hệ thống shadcn.
 */
function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
