/*
 Navicat Premium Data Transfer

 Source Server         : test
 Source Server Type    : MySQL
 Source Server Version : 50720
 Source Host           : localhost:3306
 Source Schema         : attendance_system

 Target Server Type    : MySQL
 Target Server Version : 50720
 File Encoding         : 65001

 Date: 05/11/2019 17:02:00
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for kq_attendance
-- ----------------------------
DROP TABLE IF EXISTS `kq_attendance`;
CREATE TABLE `kq_attendance`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_fk` int(11) UNSIGNED NOT NULL,
  `time_fk` int(11) UNSIGNED NOT NULL,
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `student_fk`(`student_fk`) USING BTREE,
  INDEX `attendtime_fk`(`time_fk`) USING BTREE,
  CONSTRAINT `kq_attendace` FOREIGN KEY (`student_fk`) REFERENCES `kq_student` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `kq_attendance` FOREIGN KEY (`time_fk`) REFERENCES `kq_time` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 42 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of kq_attendance
-- ----------------------------
INSERT INTO `kq_attendance` VALUES (33, 1, 14, '迟到');
INSERT INTO `kq_attendance` VALUES (34, 1, 16, '准点');
INSERT INTO `kq_attendance` VALUES (35, 1, 18, '准点');
INSERT INTO `kq_attendance` VALUES (36, 7, 20, '迟到');
INSERT INTO `kq_attendance` VALUES (37, 1, 25, '迟到');
INSERT INTO `kq_attendance` VALUES (38, 1, 42, '准点');
INSERT INTO `kq_attendance` VALUES (39, 2, 42, '迟到');
INSERT INTO `kq_attendance` VALUES (40, 3, 42, '迟到');
INSERT INTO `kq_attendance` VALUES (41, 4, 42, '迟到');

-- ----------------------------
-- Table structure for kq_class
-- ----------------------------
DROP TABLE IF EXISTS `kq_class`;
CREATE TABLE `kq_class`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `class_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '班级名称',
  `majoy_plan_fk` int(255) UNSIGNED NULL DEFAULT NULL COMMENT '专业计划表外键',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `majoy_plan_f`(`majoy_plan_fk`) USING BTREE,
  CONSTRAINT `majoy_plan_fk` FOREIGN KEY (`majoy_plan_fk`) REFERENCES `kq_majoy_plan` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of kq_class
-- ----------------------------
INSERT INTO `kq_class` VALUES (1, '网络1班', 1);
INSERT INTO `kq_class` VALUES (2, '电商1班', 2);
INSERT INTO `kq_class` VALUES (3, '网络1班', 3);
INSERT INTO `kq_class` VALUES (4, '计算机应用2班', 4);
INSERT INTO `kq_class` VALUES (5, '网络1班', 2);
INSERT INTO `kq_class` VALUES (6, '网络1班', 4);

-- ----------------------------
-- Table structure for kq_course
-- ----------------------------
DROP TABLE IF EXISTS `kq_course`;
CREATE TABLE `kq_course`  (
  `id` int(255) UNSIGNED NOT NULL AUTO_INCREMENT,
  `course_id` int(255) NULL DEFAULT NULL COMMENT '课程编号',
  `course_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '课程名称',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of kq_course
-- ----------------------------
INSERT INTO `kq_course` VALUES (1, 1541545, '前端设计开发实训');
INSERT INTO `kq_course` VALUES (2, 2323, '项目开发实训');
INSERT INTO `kq_course` VALUES (3, 6565162, '网页交互设计实训');
INSERT INTO `kq_course` VALUES (4, 44545, '大学英语');
INSERT INTO `kq_course` VALUES (5, 5656, '软件开发项目实训');
INSERT INTO `kq_course` VALUES (6, 5656, 'php程序设计');

-- ----------------------------
-- Table structure for kq_course_plan
-- ----------------------------
DROP TABLE IF EXISTS `kq_course_plan`;
CREATE TABLE `kq_course_plan`  (
  `id` int(255) UNSIGNED NOT NULL AUTO_INCREMENT,
  `term` int(15) NULL DEFAULT NULL COMMENT '学期',
  `course_fk` int(255) UNSIGNED NULL DEFAULT NULL COMMENT '课程表外键',
  `majoy_plan_fk` int(11) UNSIGNED NULL DEFAULT NULL COMMENT '专业计划表外键',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `course_id_f`(`course_fk`) USING BTREE,
  INDEX `majoy_plan_id_f`(`majoy_plan_fk`) USING BTREE,
  CONSTRAINT `course_fk` FOREIGN KEY (`course_fk`) REFERENCES `kq_course` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `kq_course_plan_ibfk_1` FOREIGN KEY (`majoy_plan_fk`) REFERENCES `kq_majoy_plan` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of kq_course_plan
-- ----------------------------
INSERT INTO `kq_course_plan` VALUES (1, 5, 1, 1);
INSERT INTO `kq_course_plan` VALUES (2, 5, 1, 2);
INSERT INTO `kq_course_plan` VALUES (3, 4, 6, 3);
INSERT INTO `kq_course_plan` VALUES (4, 3, 6, 2);
INSERT INTO `kq_course_plan` VALUES (5, 1, 2, 2);
INSERT INTO `kq_course_plan` VALUES (6, 1, 2, 4);

-- ----------------------------
-- Table structure for kq_majoy
-- ----------------------------
DROP TABLE IF EXISTS `kq_majoy`;
CREATE TABLE `kq_majoy`  (
  `id` int(255) UNSIGNED NOT NULL AUTO_INCREMENT,
  `majoy_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '专业名称',
  `majoy_id` int(11) NOT NULL COMMENT '专业编号',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of kq_majoy
-- ----------------------------
INSERT INTO `kq_majoy` VALUES (1, '电子商务专业', 5555777);
INSERT INTO `kq_majoy` VALUES (2, '计算机网络专业', 222555);
INSERT INTO `kq_majoy` VALUES (3, '计算机应用专业', 46645);
INSERT INTO `kq_majoy` VALUES (4, '食品与营养', 56565);
INSERT INTO `kq_majoy` VALUES (5, '语文教育', 451545);
INSERT INTO `kq_majoy` VALUES (6, '数媒专业', 1212312);
INSERT INTO `kq_majoy` VALUES (7, 'UI专业', 5125561);
INSERT INTO `kq_majoy` VALUES (8, '美工专业', 568911);
INSERT INTO `kq_majoy` VALUES (9, '动漫专业', 5615261);
INSERT INTO `kq_majoy` VALUES (10, '安卓专业', 56562563);

-- ----------------------------
-- Table structure for kq_majoy_plan
-- ----------------------------
DROP TABLE IF EXISTS `kq_majoy_plan`;
CREATE TABLE `kq_majoy_plan`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `grade` int(10) NULL DEFAULT NULL COMMENT '年级',
  `plan_content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '专业计划内容',
  `majoy_fk` int(255) UNSIGNED NOT NULL COMMENT '专业表外键',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `majoy_id_f`(`majoy_fk`) USING BTREE,
  CONSTRAINT `majoy_fk` FOREIGN KEY (`majoy_fk`) REFERENCES `kq_majoy` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of kq_majoy_plan
-- ----------------------------
INSERT INTO `kq_majoy_plan` VALUES (1, 2017, '', 2);
INSERT INTO `kq_majoy_plan` VALUES (2, 2018, '2018级计划内容', 1);
INSERT INTO `kq_majoy_plan` VALUES (3, 2018, '2018级计算机网络专业计划内容', 2);
INSERT INTO `kq_majoy_plan` VALUES (4, 2019, '2019计算机应用专业', 3);

-- ----------------------------
-- Table structure for kq_seat
-- ----------------------------
DROP TABLE IF EXISTS `kq_seat`;
CREATE TABLE `kq_seat`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `class_number` int(11) UNSIGNED NULL DEFAULT NULL COMMENT '教室编号',
  `seat_total` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '座位总数',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of kq_seat
-- ----------------------------
INSERT INTO `kq_seat` VALUES (1, 504, '59');

-- ----------------------------
-- Table structure for kq_student
-- ----------------------------
DROP TABLE IF EXISTS `kq_student`;
CREATE TABLE `kq_student`  (
  `id` int(255) UNSIGNED NOT NULL AUTO_INCREMENT,
  `student_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '学生编号',
  `student_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '学生姓名',
  `class_fk` int(11) UNSIGNED NULL DEFAULT NULL COMMENT '班级表外键',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `class_id_f`(`class_fk`) USING BTREE,
  CONSTRAINT `class_fk` FOREIGN KEY (`class_fk`) REFERENCES `kq_class` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of kq_student
-- ----------------------------
INSERT INTO `kq_student` VALUES (1, '201730622101', '一号', 1);
INSERT INTO `kq_student` VALUES (2, '201730622102', '二号', 1);
INSERT INTO `kq_student` VALUES (3, '201730622103', '三号', 1);
INSERT INTO `kq_student` VALUES (4, '201730622125', '二十五号', 1);
INSERT INTO `kq_student` VALUES (5, '201930622105', '五号', 6);
INSERT INTO `kq_student` VALUES (6, '201730622106', '六号', 2);
INSERT INTO `kq_student` VALUES (7, '201830622107', '七号', 2);

-- ----------------------------
-- Table structure for kq_student_seat_status
-- ----------------------------
DROP TABLE IF EXISTS `kq_student_seat_status`;
CREATE TABLE `kq_student_seat_status`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `student_fk` int(255) UNSIGNED NOT NULL COMMENT '学生表外键',
  `time_fk` int(11) UNSIGNED NOT NULL COMMENT '上课时间表外键',
  `seat` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '就座情况',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `student_fk`(`student_fk`) USING BTREE,
  INDEX `time_fk`(`time_fk`) USING BTREE,
  CONSTRAINT `kq_student_seat_status_ibfk_1` FOREIGN KEY (`student_fk`) REFERENCES `kq_student` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `kq_student_seat_status_ibfk_2` FOREIGN KEY (`time_fk`) REFERENCES `kq_time` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of kq_student_seat_status
-- ----------------------------
INSERT INTO `kq_student_seat_status` VALUES (8, 2, 40, '1');
INSERT INTO `kq_student_seat_status` VALUES (10, 1, 40, '2');
INSERT INTO `kq_student_seat_status` VALUES (11, 1, 41, '1');
INSERT INTO `kq_student_seat_status` VALUES (12, 3, 41, '3');
INSERT INTO `kq_student_seat_status` VALUES (13, 4, 41, '25');
INSERT INTO `kq_student_seat_status` VALUES (14, 1, 42, '7');
INSERT INTO `kq_student_seat_status` VALUES (15, 2, 42, '6');
INSERT INTO `kq_student_seat_status` VALUES (16, 3, 42, '28');
INSERT INTO `kq_student_seat_status` VALUES (17, 4, 42, '59');

-- ----------------------------
-- Table structure for kq_time
-- ----------------------------
DROP TABLE IF EXISTS `kq_time`;
CREATE TABLE `kq_time`  (
  `id` int(255) UNSIGNED NOT NULL AUTO_INCREMENT,
  `week_number` int(10) UNSIGNED NULL DEFAULT NULL COMMENT '周次',
  `week` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '星期',
  `what` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '节次',
  `course_plan_fk` int(255) UNSIGNED NULL DEFAULT NULL COMMENT '课程计划外键',
  `seat_fk` int(255) UNSIGNED NULL DEFAULT NULL COMMENT '教室表外键',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `course_plan_id_f`(`course_plan_fk`) USING BTREE,
  INDEX `seat_fk`(`seat_fk`) USING BTREE,
  CONSTRAINT `course_plan_id_f` FOREIGN KEY (`course_plan_fk`) REFERENCES `kq_course_plan` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `kq_time_ibfk_1` FOREIGN KEY (`seat_fk`) REFERENCES `kq_seat` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 44 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of kq_time
-- ----------------------------
INSERT INTO `kq_time` VALUES (1, 1, '星期一', '一', 1, NULL);
INSERT INTO `kq_time` VALUES (2, 2, '星期一', '二', 1, NULL);
INSERT INTO `kq_time` VALUES (3, 3, '星期五', '一', 2, NULL);
INSERT INTO `kq_time` VALUES (4, 6, '星期三', '七', 4, NULL);
INSERT INTO `kq_time` VALUES (5, 6, '星期五', '八', 1, NULL);
INSERT INTO `kq_time` VALUES (6, 8, '星期三', '二', 3, NULL);
INSERT INTO `kq_time` VALUES (7, 6, '星期五', '三', 1, NULL);
INSERT INTO `kq_time` VALUES (8, 6, '星期五', '十', 1, NULL);
INSERT INTO `kq_time` VALUES (9, 6, '星期六', '四', 1, NULL);
INSERT INTO `kq_time` VALUES (10, 6, '星期六', '一', 1, NULL);
INSERT INTO `kq_time` VALUES (11, 6, '星期六', '二', 1, NULL);
INSERT INTO `kq_time` VALUES (12, 6, '星期六', '三', 1, NULL);
INSERT INTO `kq_time` VALUES (13, 7, '星期四', '一', 1, NULL);
INSERT INTO `kq_time` VALUES (14, 8, '星期五', '四', 1, NULL);
INSERT INTO `kq_time` VALUES (15, 8, '星期五', '三', 1, NULL);
INSERT INTO `kq_time` VALUES (16, 9, '星期三', '九', 1, NULL);
INSERT INTO `kq_time` VALUES (17, 9, '星期四', '三', 1, NULL);
INSERT INTO `kq_time` VALUES (18, 9, '星期四', '五', 1, NULL);
INSERT INTO `kq_time` VALUES (19, 9, '星期四', '五', 3, NULL);
INSERT INTO `kq_time` VALUES (20, 9, '星期四', '六', 2, NULL);
INSERT INTO `kq_time` VALUES (22, 9, '星期四', '五', 3, NULL);
INSERT INTO `kq_time` VALUES (23, 9, '星期四', '七', 6, NULL);
INSERT INTO `kq_time` VALUES (24, 9, '星期四', '八', 4, NULL);
INSERT INTO `kq_time` VALUES (25, 10, '星期五', '六', 1, 1);
INSERT INTO `kq_time` VALUES (27, 10, '星期六', '七', 1, 1);
INSERT INTO `kq_time` VALUES (28, 10, '星期五', '八', 1, 1);
INSERT INTO `kq_time` VALUES (29, 10, '星期五', '九', 1, 1);
INSERT INTO `kq_time` VALUES (30, 10, '星期五', '十', 1, 1);
INSERT INTO `kq_time` VALUES (34, 10, '星期六', '二', 1, 1);
INSERT INTO `kq_time` VALUES (35, 10, '星期六', '三', 1, 1);
INSERT INTO `kq_time` VALUES (37, 10, '星期六', '四', 1, 1);
INSERT INTO `kq_time` VALUES (38, 10, '星期六', '一', 1, 1);
INSERT INTO `kq_time` VALUES (39, 10, '星期六', '五', 1, 1);
INSERT INTO `kq_time` VALUES (40, 11, '星期二', '五', 1, 1);
INSERT INTO `kq_time` VALUES (41, 11, '星期二', '六', 1, 1);
INSERT INTO `kq_time` VALUES (42, 11, '星期二', '七', 1, 1);
INSERT INTO `kq_time` VALUES (43, 11, '星期二', '七', 1, 1);

SET FOREIGN_KEY_CHECKS = 1;
