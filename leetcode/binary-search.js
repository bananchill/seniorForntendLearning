/**
 * Given an array of integers nums which is sorted in ascending order,
 * and an integer target, write a function to search target in nums.
 * If target exists, then return its index. Otherwise, return -1.
 *
 * You must write an algorithm with O(log n) runtime complexity.
 *
 *
 *
 * Example 1:
 *
 * Input: nums = [-1,0,3,5,9,12], target = 9
 * Output: 4
 * Explanation: 9 exists in nums and its index is 4
 * Example 2:
 *
 * Input: nums = [-1,0,3,5,9,12], target = 2
 * Output: -1
 * Explanation: 2 does not exist in nums so return -1
 * */


/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
    if (!Array.isArray(nums)) {
        return -1
    }
    let length = nums.length;
    if (length === 0) {
        return -1;
    }

    if (length === 1) {
        return nums[0] === target ? 0 : -1;
    }

    let start = 0;
    let end = length - 1;


    while (start <= end) {
        const middle = ~~((end + start) / 2);

        if (nums[middle] === target) {
            return middle;
        } else if (nums[middle] > target) {
            end = middle - 1;
        } else {
            start = middle + 1;
        }
    }

    return -1;
};

console.log(search([2,5], 5))