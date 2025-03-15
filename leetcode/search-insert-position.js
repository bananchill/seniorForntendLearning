/**
 * Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.
 *
 * You must write an algorithm with O(log n) runtime complexity.
 *
 *
 *
 * Example 1:
 *
 * Input: nums = [1,3,5,6], target = 5
 * Output: 2
 * Example 2:
 *
 * Input: nums = [1,3,5,6], target = 2
 * Output: 1
 * Example 3:
 *
 * Input: nums = [1,3,5,6], target = 7
 * Output: 4
 *
 * */


/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
    if (!Array.isArray(nums)) {
        return -1
    }
    let length = nums.length;
    if (length === 0) {
        return 0;
    }

    if (length === 1) {
        return nums[0] >= target ? 0 : 1;
    }

    let start = 0;
    let end = length - 1;


    while (start <= end) {
        const middle = ~~((end + start) / 2);

        if (nums[middle] === target) {
            return middle;
        }


        if (nums[middle] > target) {
            if (nums[middle] > target && nums[middle - 1] < target) {
                return middle ;
            }
            end = middle - 1;
        } else {
            if (nums[middle] < target && nums[middle + 1] > target) {
                return middle + 1;
            }
            start = middle + 1;
        }
    }

    return nums[0] > target ? 0 : length ;
};

console.log(searchInsert([1], 0))