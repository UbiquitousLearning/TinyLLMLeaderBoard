import React from "react";
import { cn } from "@/lib/utils";

// SubTitle component
function SubTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-between space-y-2 py-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// SubTitleHeading component
function SubTitleHeading({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn("text-2xl font-bold tracking-tight", className)}
      {...props}
    >
      {children}
    </h2>
  );
}

// SubTitleDescription component
function SubTitleDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-muted-foreground", className)} {...props}>
      {children}
    </p>
  );
}

// SubTitleActions component
function SubTitleActions({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center space-x-2", className)} {...props}>
      {children}
    </div>
  );
}
export { SubTitle, SubTitleHeading, SubTitleDescription, SubTitleActions };
