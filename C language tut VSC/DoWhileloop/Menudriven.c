// C program for a menudriven operations using do while loop.

#include <stdio.h>
#include <stdlib.h>


int main()
{
    int i, r, n, d=0, sum=0, temp, rev=0, result=0, res=1, count=0; 
    int flag=0, ch;
    do
    {
        printf("------------Operations of numbers ------------ \n");
        printf("\n1 - Addition of elements in a numbers\n2 - Display reverse of the number\n3 - To identify if it is an Armstrong number\n4 - Check the palindrome of number\n5 - To check the neon number\n6 - To check if it is a prime number\n7 - To check if it is a perfect number\n8 - To Display factors of the number\n9 - To display factorial of a number");
        printf("\nEnter your choice : \n");
        scanf("%d", &ch); //choices from 1 to 4

    switch(ch)
        {

        case 1 : //To display addition of the elements in a given number
        printf("Enter the number do you want to add : \n");
        scanf("%d", &i);

        while(i>0)
        {
            r = i%10;
            sum = sum + r;
            i = i/10;
        }i++;

        printf("\nAddition of numbers in given number is : \n");
        printf("%d", sum);
        break;
        


        case 2 : // To display reverse of the number
        printf("\nEnter any number : ");
        scanf("%d", &n); //n= 121
        i = n;

        while(n!=0) //121!=0 
        {
        r = n%10;  //121%10=1
        n = n/10;  //121/10=12
        rev = (rev*10) + r; //0*10+1=1        
        }
        printf("\bReverse of no is : %d", rev);
        break;



        case 3 : // Armstrong number
        printf("Enter the number you want to check : \n");
        scanf("%d", &i);
        n = i;

        while(n!=0)
        {
        r = n % 10;
        result += r*r*r;
        n/=10;
        }n++;

        if(result==i)
        {
        printf("\n%d is an Armstrong number." , i);
        }
        else
        {
        printf("\n%d is not an Armstrong number !!" , i);
        }
        break;



        case 4 : // Palindrome of a number
        printf("\nEnter any number : ");
        scanf("%d", &n); //n= 121
        i = n, rev=0;

        while(n!=0) //121!=0 
        {
            r = n%10;  //121%10=1
            n = n/10;  //121/10=12
            rev = (rev*10) + r; //0*10+1=1        
        }
        printf("\nReverse of no is : %d", rev);

        if(i==rev)
        {
        printf("\n%d number is a palindrome number");
        }
        else
        {
        printf("\n%d number is not a palindrome number");
        }
        break;
        

        
        case 5 : //Neon number
        printf("\nEnter any number : ");
        scanf("%d", &n);
        i = n*n;

        while(i!=0)
        {
            r = i%10;
            sum = r + sum;
            i = i/10;
        }
        if(sum==n)
        {
        printf("%d is a neon number", n);
        }
        else
        {
        printf("%d is not a neon number", n);
        }
        break;



        case 6 : // Prime number
        printf("Enter number to check prime number or not : \n");
        scanf("%d",&n);
        i=2;
        
        while( i<=n/2)
        {
        // check for non prime number
        if(n%i==0)
        {
            count=1;
            break;
        }
        i++;
        }
        if (count==0)
        printf("%d is a prime number",n);
        else
        printf("%d is not a prime number",n);
        break;



        case 7 : //perfect number
        printf("\nEnter any number : ");
        scanf("%d", &n); //n=28=1+4+7+14
        i = 1;
        
        while(i<n)
        {
            if(n%i==0)
            {
                d= d+i;
            }
            i++;

        }
        if(d==0)
        {
            printf("\nThe given number is not a perfect number");    
        }
        else
        {
            printf("\nThe given number is a perfect number");
        }
        break;


        case 8 : // Factors of a number
        printf("\nEnter any number : ");
        scanf("%d", &n); //n=1
        i = 2;
        
        while(i<=n/2) 
        {
        if(n%i == 0) {
            printf("\n%d", i); //i = 2 5
        }
        i++; //i = 10 6 7 8 9
        }
        break;


        case 9 : //Factorial of a number
        printf("\nEnter any number : ");
        scanf("%d", &n);
        i = 2;

        while(i<=n)
        {
        res = res*i;
        i++;
        }
        printf("\nFactorial of %d is : %d", n, res);
        break;


        // end of switch cases
        }
        printf("\nDo you want to continue? (Press 1 to continue or Press any other number to exit the program.)\n");
        scanf("%d", &ch);

    }
    while(ch==1);
    printf("\n---------Thank you---------");

    return 0;
}